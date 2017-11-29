import {Component, AfterContentInit, OnInit }from '@angular/core'; 
import {User, Menu, TipoMenu, Student, AcademicRecords }from "../../../app.models"; 
import {StudentService, GlobalService }from "../../../app.services"; 
import {debug }from 'util'; 

declare var llamarEventosMainJS:any
declare var fixDashboard:any
@Component( {
selector:'app-dashboard', 
templateUrl:'./dashboard.component.html'
})
export class DashboardComponent implements AfterContentInit, OnInit {


public user:User
  public dashboard:Menu[]
  public academicRecord:AcademicRecords
  public hasAcademicRecordChanges:boolean
  public loadConstructor = false; 
ngAfterContentInit() {
llamarEventosMainJS(); 
}

constructor(private studentService:StudentService, 
private globalService:GlobalService) {
this.user = globalService.user
    this.hasAcademicRecordChanges = globalService.getAcademicRecord.observers.length > 0

    this.globalService.academicRecord$.subscribe((academicRecord:AcademicRecords) =>  {
this.dashboard = null
      this.configDashboard(academicRecord)
this.loadConstructor = true; 
})
}

ngOnInit():void {
debugger; 
if (this.hasAcademicRecordChanges &&  ! this.loadConstructor) {
this.getDashboard()
}
}

/**
   * Método que configura la información del estudiante para obtener su información de Dashboad.
   * 
   * @param {AcademicRecords} academicRecord 
   * @memberof DashboardComponent
   */
configDashboard(academicRecord:AcademicRecords) {
this.academicRecord = academicRecord
    this.user.level = this.academicRecord.levelId
    this.user.modality = this.academicRecord.modality.replace('COP', '')
this.user.userType = this.academicRecord.studentType
    this.getDashboard()
}

/**
   * Obtiene el menú del dashboard - landing-page
   * 
   * @memberof DashboardComponent
   */
getDashboard() {
this.studentService.getMenu(this.user).subscribe(menu =>  {
this.dashboard = menu.find(item => item.id == 2).options
      setTimeout(() =>  {
fixDashboard(); 
}, 5); 
})
}
}
