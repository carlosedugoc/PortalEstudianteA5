import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";
import { GeneralUtils } from "../classes/general/GeneralUtils";

@Injectable()
export class BannerService {
  public utilidades: GeneralUtils

  constructor(private http: Http) {
    this.utilidades = new GeneralUtils(this.http)
  }

  getToken() {
    let url = this.utilidades.getServiceByBannerName('token')

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', 'client_credentials');

    let body = urlSearchParams.toString()

    let headers = new Headers({
      'authorization': this.utilidades.getServiceByBannerName('authorization'),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(url, body, { headers }).map(respuesta => respuesta.json()['access_token'])
  }

  getTitulos(token: string, url: string) {
    let headers = new Headers({
      'authorization': `Bearer ${token}`
    });
    return this.http.get(url, { headers })
      .map(respuesta => {
        return respuesta
      })
  }

  /**
 * Método para obtener el token cuando se autetica el usuario.
 * 
 * @returns 
 * @memberof BannerService
 */
  getTokenAuthenticationStudent() {
    let url = this.utilidades.getServiceByBannerName('token')

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', 'password');
    urlSearchParams.append('username', 'estudiante@ilumno.com');
    urlSearchParams.append('password', '123qwe123');

    let body = urlSearchParams.toString()

    let headers = new Headers({
      'authorization': this.utilidades.getServiceByBannerName('authorization'),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(url, body, { headers }).map(respuesta => respuesta.json())
  }

  /**
   * Método que me permite obtener información del estudiante
   * 
   * @param {string} bearer Token de autenticación del estudiante.
   * @param {boolean} [academicRecord] Información académica del estudiante, este parámetro es opcional.
   * @returns 
   * @memberof BannerService
   */
  getInformatioStudent(idUniversity: string, bearer: string, academicRecord?: boolean) {
    debugger;
    let nameUni: string = ""

    switch (idUniversity) {
      case "1":
        nameUni = "fuaa"
        break;
      case "2":
        nameUni = "poli"
        break;
    }

    let url: string = this.utilidades.getServiceByBannerName("student-info") + (academicRecord == true ? '?include=academicrecords' : '')
    url = url.replace("{0}", nameUni)

    let headers = new Headers({
      'authorization': `Bearer ${bearer}`
    });

    return this.http.get(url, { headers }).map(respuesta => respuesta.json());
  }
}

