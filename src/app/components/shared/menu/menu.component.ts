import { Component, AfterViewInit, Input, OnInit, AfterContentInit } from '@angular/core';
import { Menu, User, Student, TipoMenu, AcademicRecords } from "../../../app.models";
import { GlobalService, StudentService } from "../../../app.services";
import { Enumerable, List } from "linqts";
import { ObservableInput } from 'rxjs/Observable';
import { Router } from "@angular/router";

declare var llamarEventosMainJS: any
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})

export class MenuComponent implements AfterViewInit, OnInit, AfterContentInit {

  public loading: boolean
  public student: Student
  public academicRecordSelected: AcademicRecords
  public menus: TipoMenu[]

  ngOnInit() {

  }

  ngAfterContentInit() {
    llamarEventosMainJS();
  }

  @Input('menu') menu: Menu[]
  @Input('perfil') perfil: Menu[]

  public user: User

  constructor(private globalService: GlobalService, private router: Router, private studentService: StudentService) {
    this.user = globalService.user
    if (this.user.rol != "1") {
      this.globalService.student$.subscribe((studentInfo: Student) => {
        this.configStudentInfo(studentInfo)
        this.getMenu();
      })
    }
  }

  /**
   * Método que configura la información del estudiante para siguientes procesos con dicha información.
   * 
   * @param {Student} studentInfo Información del estudiante ya verificado.
   * @memberof MenuComponent
   */
  configStudentInfo(studentInfo: Student) {
    this.student = studentInfo
    this.orderAcademicRecords();
    if (this.student != undefined && this.student.academicRecords != undefined && this.student.academicRecords[0] != undefined) {
      this.changeAcademicRecord(this.student.academicRecords[0].programId)
    }
  }

  /**
   * Ordenamiento de las carreras del estudiante
   * El ordenamiento tiene la siguiente relevancia:
   * Primero los de mayor avance y luego orden alfabético.
   * @memberof MenuComponent
   */
  orderAcademicRecords() {
    let acadRec = new List(this.student.academicRecords);
    acadRec = acadRec.Where(n => n.programStatus == 'ACTIVE').ToList();
    this.student.academicRecords = acadRec.OrderBy(n => n.programDescription).OrderByDescending(n => n.advancePercentaje).ToArray()
  }
  /**
   * Método que establece el programa académico escogido por el estudiante.
   * 
   * @param {string} idProgram id del programa académico seleccionado del estudiante.
   * @memberof MenuComponent
   */
  changeAcademicRecord(idProgram: string) {
    let acadRec = new List(this.student.academicRecords);
    this.academicRecordSelected = acadRec.Where(n => n.programId == idProgram).FirstOrDefault()
    this.goPrincipal()
    setTimeout(() => {// Se deja este timeout para que primero pueda hacer la redirección antes de llenar el objeto. :(
      this.globalService.setAcademicRecord = this.academicRecordSelected
    }, 0);
  }

  /**
   * Método que redirige a Dashboard
   * 
   * @memberof MenuComponent
   */
  goPrincipal() {
    if (this.router.url != "/dashboard") {
      this.router.navigate(['/dashboard'])
    }
  }

  /**
   * Obtiene el menú con las opciones parametrizadas para los usuarios
   * 
   * @returns 
   * @memberof MenuComponent
   */
  getMenu() {
    const promise = new Promise((resolve, reject) => {

      // Se llena la infomación del user logueado.
      this.globalService.user.level = this.academicRecordSelected.levelId
      this.globalService.user.modality = this.academicRecordSelected.modality.replace("COP", "")
      this.globalService.user.userType = this.academicRecordSelected.studentType
      this.user = this.globalService.user

      this.studentService.getMenu(this.user).subscribe(menu => {
        debugger;
        console.log("menu consulta:", menu);
        this.globalService.menu = menu
        //this.menu =  this.menus.find(item => item.id == 1).options
        resolve()
      })
    })
    return promise
  }

  //quita los divs del acordion para que se colapse
  ngAfterViewInit() {
    setTimeout(function () {
      var pTags = $("*[id='wrap']");
      console.log('ptags', pTags)
      pTags.unwrap();
    }, 2000);
  }
}


