import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";
import { GeneralUtils } from '../classes/general/GeneralUtils'
import { TipoMenu, User } from "../app.models";

@Injectable()
export class StudentService {

  private utility: GeneralUtils
  private generalUrl: any

  constructor(private http: Http) {
    this.utility = new GeneralUtils(http)
  }

  //Obtiene el menú para el usuario dado
  getMenu(user: User) {
    debugger;
    this.generalUrl = this.utility.getServiceByName('UrlApiRest')
    let urlServicio: string = `${this.generalUrl}/api/Option/University/${user.university}/Level/${user.level}/Modality/${user.modality}/UserType/${user.userType}`
    console.log("url servicio: ", urlServicio)
    return this.http.get(urlServicio).map(menu => {
      return menu.json()
    })
  }
}

