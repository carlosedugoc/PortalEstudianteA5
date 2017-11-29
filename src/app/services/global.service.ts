import { Injectable } from '@angular/core';
import { User, Student, Menu, AcademicRecords } from "../app.models";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AcademicProgram } from '../models/academic-program';

//// Esta clase permite la comunicación entre los componentes.
@Injectable()
export class GlobalService {

  private _student: Subject<Student>
  private _academicRecord: Subject<AcademicRecords>

  // Observables
  student$: Observable<Student>
  academicRecord$: Observable<AcademicRecords>

  user: User;
  menu: Menu[];
  AutenticationStudentToken: string

  constructor() {
    this._student = new Subject<Student>();
    this.student$ = this._student.asObservable();

    this._academicRecord = new Subject<AcademicRecords>();
    this.academicRecord$ = this._academicRecord.asObservable();
  }

  set setStudent(newValue) {
    this._student.next(newValue);
  }

  set setAcademicRecord(newValue) {
    this._academicRecord.next(newValue);
  }

  get getAcademicRecord() {
    return this._academicRecord;
  }

  get getStudent() {
    return this._student;
  }

  /**
   * Método que registra errores de la aplicación.
   * 
   * @param {*} error 
   * @memberof GlobalService
   */
  public writeLog(error: any) {
    if (error != undefined) {
      let e: any = {
        Date: new Date(),
        Error: error
      }
      console.log(e);
    }
  }
}