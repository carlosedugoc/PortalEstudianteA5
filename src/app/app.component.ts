import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { Menu, TipoMenu, ItemSubMenu, SubMenu, User } from "./app.models";
import { StudentService, GlobalService, BannerService } from "./app.services";
import { OAuthService } from 'angular-oauth2-oidc';
import { GeneralUtils } from "./classes/general/GeneralUtils";
import { Http } from '@angular/http';
import { debug } from 'util';
import * as moment from 'moment';
import { FilterMenuPipe } from './pipes/filter-menu.pipe';

declare var cambiarPosicionHojaEstilos: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StudentService, BannerService]
})

export class AppComponent implements OnInit {

  public language: string
  public user: User
  public users: User[]
  public menu: Menu[]
  public dashboard: Menu[]
  public notificaciones: Menu[]
  public redesSociales: Menu[]
  public perfiles: Menu[]
  public menus: TipoMenu[]

  public inDev: boolean

  public utilidades: GeneralUtils

  userName: string;
  password: string;
  loginFailed: boolean = false;

  public logued: boolean = sessionStorage.getItem('logued') != null && sessionStorage.getItem('logued') == 'true'
  public clientID: string
  private idIntervalAccesToken

  @HostListener('mouseover') validateInactivity() {
    sessionStorage.setItem('lastMoveTime', moment().toString())
  }

  // ngDoCheck() {
  //   if (sessionStorage.getItem('expires_at')){
  //     let dateIAM = moment(Number(sessionStorage.getItem('expires_at')));
  //     let minutes = dateIAM.diff(moment(),'m')
  //     console.log('minutes', minutes)
  //     if (minutes < 1){
  //       this.logout(true)
  //     }
  //   }
  // }



  constructor(private router: Router,
    private translate: TranslateService,
    private studentService: StudentService,
    private oauthService: OAuthService,
    private http: Http,
    private globalService: GlobalService,
    private bannerService: BannerService) {

    this.utilidades = new GeneralUtils(this.http)
    this.inDev = this.utilidades.getValidationByName('dev');
    setInterval(() => {
      if (sessionStorage.getItem('lastMoveTime')) {
        let time = moment(sessionStorage.getItem('lastMoveTime'))
        let minutes = moment().diff(time, 'm')
        console.log('minutes inactive', minutes)
        let t = this.utilidades.getValidationByName('inactiveTime')
        if (minutes >= t) {
          this.logout(true)
        }
      }
    }, 60000)
  }


  ngOnInit(): void {
    this.language = window.navigator.language.substr(0, 2)
    this.translate.setDefaultLang(this.language);
    if (!this.inDev) {
      this.connectIAM(this.getParameters())
    } else {
      this.connectDev()
    }
  }

  //CLIENTS ID EN DESPLIEGUE
  //'alYAmiZd7_SKbAJmNTOSorHR6Koa' -- poli
  //'tb79f9QZ4j77P3kqSwCnZVVTd9ga' --aandina
  //'qAnYSzfC4Uf0B4_UqK4JjfDCpQQa' --ilumno

  //Realiza la conexión con el IAM
  connectIAM(url: string) {
    switch (url) {
      case "poli":
        this.clientID = this.utilidades.getClientId('poli')
        break;
      case "aandina":
        this.clientID = this.utilidades.getClientId('aandina')
        break;
      default:
        this.clientID = this.utilidades.getClientId('ilumno')
        break;
    }

    this.configuraConexionIAM()
    this.logIAM()

  }
  ////Obtiene los parametros enviados por get y los almacena en el localstorage
  getParameters() {
    this.utilidades = new GeneralUtils(this.http)
    let url: string = this.utilidades.getParameterHrefByName('university')
    let usr: string = this.utilidades.getParameterHrefByName('usr')
    if (usr) {
      localStorage.setItem('codUsr', usr)
    }
    if (!url) { url = localStorage.getItem('uni') }
    localStorage.setItem('uni', url)
    return url
  }

  //Se configura el objeto del IAM con los parametros de conexión
  configuraConexionIAM() {
    this.oauthService.loginUrl = this.utilidades.getServiceByName('UrlLoginIAM'); //Id-Provider?
    this.oauthService.redirectUri = window.location.origin + "/index.html";
    this.oauthService.clientId = this.clientID;
    this.oauthService.scope = "openid";
    this.oauthService.resource = "";
    if (localStorage.getItem('endsession') == 'true') {
      this.oauthService.resource = "endsession"
      localStorage.removeItem('endsession')
    }
    this.oauthService.oidc = true;
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.logoutUrl = this.utilidades.getServiceByName('UrlLogoutIAM');
    this.oauthService.tryLogin({});
  }

  //Configuración del login 
  logIAM() {
    this.getUsuarios()
    let token = sessionStorage.getItem('access_token')
    console.log('token', token)
    if (token) {
      //      this.logued = true
      sessionStorage.setItem('logued', 'true')
      //Se obtiene el usuario
      let codUsr: string = localStorage.getItem('codUsr')
      if (!codUsr) { codUsr = 'su' }
      console.log('usuario', codUsr)
      this.user = this.users.find(item => item.userId == codUsr)
      this.globalService.user = this.user
      sessionStorage.setItem('user', JSON.stringify(this.user))
      document.getElementById('estilos')['href'] = `../assets/css/estilos${this.user.university}.css`
      debugger;
      // let domine = this.getDomine()

      // if (domine == '') {
      //   //Se colocan los estilos segun la universidad y el idioma
      //   document.getElementById('estilos')['href'] = `../assets/css/estilos${this.user.university}.css`
      // } else {
      //   document.getElementById('estilos')['href'] = `../assets/css/estilos${domine}.css`
      // }
      cambiarPosicionHojaEstilos()

      this.switchLanguage(this.language)
      //this.getMenu()
      //Se redirecciona dependiendo del rol que se loguea
      if (this.user.rol != "2") {
        this.router.navigate(['administration'])
      } else {
        this.cargarInfoEstudiante();
        this.router.navigate(['dashboard'])
      }

    }
    else {
      this.login()
    }
  }

  //Realiza la autenticación ante el IAM
  login() {
    this.oauthService.clientId = this.clientID
    this.oauthService.initImplicitFlow();
  }

  //Realiza el cierre de sessión ante el IAM
  logout(endsession: boolean) {
    if (endsession) {
      this.logued = false
      if (this.inDev) { sessionStorage.clear(); this.router.navigate(['/']) }
      else {
        this.oauthService.logOut();
        sessionStorage.clear();
      }
    }
  }

  //Obtiene los datos del usuario autenticado
  get givenName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  getDomine() {
    debugger;
    let style: string = ''
    if (this.oauthService.getIdentityClaims()) {
      let university = this.oauthService.getIdentityClaims().sub.split('@')[1]
      switch (university) {
        case 'poligran.edu.co':
          style = '2'
          break;
        case 'areandina.edu.co':
          style = '1'
          break;
        default:
          style = '0'
          break;
      }
    }
    return style
  }



  //Obtiene los usuarios de prueba
  getUsuarios() {
    this.users = [
      {
        userId: "su",
        name: "Administrador Ilumno",
        rol: "1",
        university: "0",
        modality: "PR",
        level: "UG",
        userType: "AS"
      },
      {
        userId: "AA",
        name: "Administrador Areandina",
        rol: "1",
        university: "1",
        modality: "PR",
        level: "UG",
        userType: "AS"
      },
      {
        userId: "Poli",
        name: "Administrador Politécnico",
        rol: "1",
        university: "2",
        modality: "PR",
        level: "UG",
        userType: "AS"
      },
      {
        userId: "123456",
        name: "Carlos Eduardo González Cortes",
        rol: "2",
        university: "1",
        modality: "PR",
        level: "UG",
        userType: "AS"
      },
      {
        userId: "654123",
        name: "Diana Marcela Bojaca",
        rol: "2",
        university: "2",
        modality: "DI",
        level: "GR",
        userType: "AS"
      }
    ]
  }

  //Obtiene el menú con las opciones parametrizadas para los usuarios
  // getMenu() {
  //   const promise = new Promise((resolve, reject) => {
  //     this.studentService.getMenu(this.user).subscribe(menu => {
  //       this.menus = menu
  //       this.globalService.menu = this.menus.find(item => item.id == 2).options
  //       resolve()
  //     })
  //   })
  //   return promise
  // }

  //Cambia el lenguaje de la página
  switchLanguage(language: string) {
    this.translate.use(language);
  }

  //Conexión para ambiente local de desarrollo
  connectDev() {
    this.logued = sessionStorage.getItem('logued') != null && sessionStorage.getItem('logued') == 'true'
    if (!this.logued) {
      this.getUsuarios()
    } else {
      this.cargarInfoEstudiante();
      this.user = JSON.parse(sessionStorage.getItem('user'))
      this.globalService.user = this.user
      //this.getMenu()
      document.getElementById('estilos')['href'] = `../assets/css/estilos${this.user.university}.css`
      cambiarPosicionHojaEstilos()
    }
  }

  //Login para ambiente local de desarrollo
  loginDev(user: string) {
    debugger;
    this.logued = true
    sessionStorage.setItem('logued', 'true')
    this.user = this.users.find(item => item.userId == user)
    this.globalService.user = this.user
    sessionStorage.setItem('user', JSON.stringify(this.user))
    this.switchLanguage(this.language)
    document.getElementById('estilos')['href'] = `../assets/css/estilos${this.user.university}.css`
    cambiarPosicionHojaEstilos()

    //this.getMenu()
    if (this.user.rol != "2") {
      this.router.navigate(['/administration'])
    } else {
      this.cargarInfoEstudiante();
      this.router.navigate(['/dashboard'])
    }
  }

  /**
   * Método que carga la información del estudiante.
   * 
   * @memberof AppComponent
   */
  cargarInfoEstudiante() {
    this.loadStudentToken().then(() => {
      this.loadStudentInfo()
    })
  }

  /**
   * Método que carga la información del token una vez se encuentra logueado un estudiante.
   * 
   * @returns 
   * @memberof AppComponent
   */
  loadStudentToken() {
    const promesa = new Promise((resolve, reject) => {
      try {
        if (this.logued) {
          this.bannerService.getTokenAuthenticationStudent().subscribe(res => {
            if (res != undefined) {
              this.globalService.AutenticationStudentToken = res["access_token"]
              let expires_in = res["expires_in"];
              if (expires_in > 0) {
                clearInterval(this.idIntervalAccesToken)
                this.idIntervalAccesToken = setInterval(() => this.loadStudentToken(), expires_in * 1000);//Segundos.
              }
            }
            else {
              this.globalService.writeLog("El servicio token no devolvió información.")
            }
            resolve(res)
          },
            error => {
              this.globalService.writeLog(error);
              reject(new Error(error))
            });
        }
        else {
          clearInterval(this.idIntervalAccesToken)
        }
      } catch (error) {
        this.globalService.writeLog(error);
        alert("Ocurrió un error al tratar de obtener el token");
      }
    });
    return promesa
  }

  /**
   * Función que carga la información del estudiante ya logueado.
   * 
   * @private
   * @memberof AppComponent
   */
  private loadStudentInfo() {
    const promesa = new Promise((resolve, reject) => {
      debugger;
      this.bannerService.getInformatioStudent(this.user.university, this.globalService.AutenticationStudentToken, true).subscribe(res => {
        this.globalService.setStudent = res;
      })
    })
    return promesa
  }
}