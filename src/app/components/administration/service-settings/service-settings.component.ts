import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//SERVICES
import { AdministrationService, BannerService, GlobalService } from "../../../app.services";
//MODELS
import { Servicio, Item, UrlServicios, User, Status, Level, Modality  } from "../../../app.models";
//CROSS-CUTTING
import { GeneralUtils } from "../../../classes/general/GeneralUtils";

declare var llamarEventosMainJS: any

@Component({
  selector: 'app-service-settings',
  templateUrl: './service-settings.component.html',
  providers: [AdministrationService, BannerService]
})
export class ServiceSettingsComponent {
  
    public servicios: Servicio[]
    public modality: Modality[] = []
    public levels: Level[] = []
    public status: Status[] = []
    public token;
    public errorMessage: string
    public total_modalidades: number
    public total_niveles: number
    public total_estados: number
    public url_servicios_universidad: UrlServicios[]
    public url_servicio: UrlServicios
    public loading: boolean
    public show_table: boolean
    public rol: string
    public url_Servicios_backend: any
    public tipos: any[]
    public faltantes: any[]
    public faltantesMensaje: any[]
    public eliminados: any[]
    public user: User
    public idUser: string
    public utilidades: GeneralUtils
    public serv: boolean = false
  
  
    constructor(private adminService: AdministrationService,
      private bannerService: BannerService,
      private http: Http,
      private globalService: GlobalService) {
  
      this.utilidades = new GeneralUtils(this.http)
      this.loading = false
      this.show_table = false
      this.user = this.globalService.user
      if (this.user.rol == '1') {
        this.load_data(this.user.university)
      }
  
      setTimeout(function () {
        llamarEventosMainJS(); //// Función de js para validación de botones y alertas. Main.js
      }, 100);
    }
  
    //Carga la grilla con los datos se los servicios de la universidades
    load_data(IdUniversidad: string) {
      this.serv = false
      this.eliminados = []
      this.faltantesMensaje = []
      if (IdUniversidad == '0') {
        this.show_table = false
        return
      }
      this.loading = true
      this.getToken().then(() => {
        this.getTitulos(IdUniversidad).then(() => {
          this.getServicios(IdUniversidad).then(() => {
            this.procesarInformacion(IdUniversidad).then(() => {
              return Promise.resolve()
            })
          })
        }).catch((err) => {
          if (err.status == 401) {
            localStorage.removeItem('token')
            this.load_data(IdUniversidad)
          } else {
            console.error('Se ha producido un error de conexión')
          }
        })
      }).catch((error) => {
        this.loading = false
        this.show_table = false
        console.error(error)
      })
    }
  
    //Se obtienen los servicios que se van a configurar
    getServicios(IdUniversidad: String) {
      const promesa = new Promise((resolve, reject) => {
        this.servicios = []
        this.adminService.getServicios(IdUniversidad, this.utilidades.getServiceByName('UrlApiRest')).subscribe(data => {
          this.servicios = data
          this.serv = false
          if (this.servicios.length == 0) { this.serv = true }
          resolve()
        }, error => {
          reject(error)
        })
      })
      return promesa
    }
  
    //Se obtienen las categorias faltantes para agregarlas y mostrarlas al usuario
    procesarInformacion(IdUniversidad: String) {
  
      const promise = new Promise((resolve, reject) => {
        this.tipos = []
        for (let mod of this.modality) {
          this.tipos.push({
            id_item: mod.modalityId,
            description: mod.description,
            tipo: 'Modalidad',
            id_tipo: 1
          })
        }
  
        for (let lev of this.levels) {
          this.tipos.push({
            id_item: lev.levelId,
            description: lev.description,
            tipo: 'Nivel',
            id_tipo: 2
          })
        }
  
        for (let sta of this.status) {
          this.tipos.push({
            id_item: sta.statusId,
            description: sta.description,
            tipo: 'Estado',
            id_tipo: 3
          })
        }
  
        this.faltantes = []
        this.eliminados = []
        let encontrado: boolean = false
  
        for (let servicio of this.servicios) {
          for (let item of servicio.data) {
            encontrado = false
            for (let tipo of this.tipos) {
              if (item.itemName.toUpperCase() == tipo.description.toUpperCase()) {
                encontrado = true
                break
              }
            }
            if (!encontrado) {
              this.eliminados.push(item)
            }
          }
          break
        }
  
        let serviceIndex = 0
        for (let servicio of this.servicios) {
          let itemsOrdenados: Item[] = []
          for (let tipo of this.tipos) {
            encontrado = false
            for (let item of servicio.data) {
              if (item.itemName.toUpperCase() == tipo.description.toUpperCase()) {
                itemsOrdenados.push(item)
                encontrado = true
                break
              }
            }
            if (!encontrado) {
              this.faltantes.push({
                serviceTypeId: tipo.id_tipo,
                itemName: tipo.description,
                itemCode: tipo.id_item,
                universityCode: IdUniversidad
              })
            }
          }
          if (this.faltantes.length > 0) {
            this.saveItems(this.faltantes, IdUniversidad)
            console.log('faltantes', this.faltantes)
            return
          } else {
            servicio.data = itemsOrdenados
          }
          serviceIndex++
  
          if (this.servicios.length == serviceIndex) {
            resolve()
            if (this.eliminados.length > 0 || (this.faltantesMensaje && this.faltantesMensaje.length > 0)) {
              document.getElementById('openModalButton').click()
            }
            this.loading = false
            this.show_table = true
          }
        }
      })
      return promise
    }
    //Se obtiene las categirías de los servicios de las universidades
    getTitulos(IdUniversidad: string) {
      const promesa = new Promise((resolve, reject) => {
        this.getModalidades(IdUniversidad).then(() => {
          this.getNiveles(IdUniversidad).then(() => {
            this.getEstados(IdUniversidad).then(() => {
              resolve()
            }).catch((error) => {
              reject(error)
            })
          }).catch((error) => {
            reject(error)
          })
        }).catch((error) => {
          reject(error)
        })
      })
      return promesa
    }
  
    //Se obtiene los niveles de los servicios de las universidades
    getNiveles(IdUniversidad: string) {
      const promesa = new Promise((resolve, reject) => {
        this.levels = []
        this.total_niveles = 0
        this.bannerService.getTitulos(this.token, this.utilidades.getInfoUniversitiesByCode(IdUniversidad).FirstOrDefault().ServicioNivel).subscribe(niveles => {
          this.levels = niveles.json()
          this.total_niveles = this.levels.length
          resolve(niveles)
        }, error => {
          reject(error)
        })
      })
      return promesa
    }
  
    //Se obtiene las modalidades de los servicios de las universidades
    getModalidades(IdUniversidad: string) {
      const promesa = new Promise((resolve, reject) => {
        this.modality = []
        this.total_modalidades = 0
        this.bannerService.getTitulos(this.token, this.utilidades.getInfoUniversitiesByCode(IdUniversidad).FirstOrDefault().ServicioModalidad).subscribe(modalidades => {
          this.modality = modalidades.json()
          this.total_modalidades = this.modality.length
          resolve(modalidades)
        }, error => {
          reject(error)
        })
      })
      return promesa
    }
  
    //Se obtiene los estados de los servicios de las universidades
    getEstados(IdUniversidad: string) {
      const promesa = new Promise((resolve, reject) => {
        this.status = []
        this.total_estados = 0
        this.bannerService.getTitulos(this.token, this.utilidades.getInfoUniversitiesByCode(IdUniversidad).FirstOrDefault().ServicioEstado).subscribe(estados => {
          this.status = estados.json()
          this.status.push({
            statusId: 'AC',
            description: 'Acudiente',
            statusType: ""
          })
          this.total_estados = this.status.length
          resolve(estados)
        }, error => {
          reject(error)
        })
      })
      return promesa
    }
  
    //se obtiene el token para consumir los servicios de las universidades
    getToken() {
      const promesa = new Promise((resolve, reject) => {
        if (!localStorage.getItem('token')) {
          this.bannerService.getToken().subscribe(response => {
            this.token = response
            if (this.token.length <= 0) {
              alert("El token no se ha generado correctamente");
            } else {
              localStorage.setItem('token', this.token);
              resolve(this.token)
            }
          }, error => {
            let errorMessage = <any>error;
            if (errorMessage != null) {
              this.errorMessage = error.error_description
              console.log(this.errorMessage);
              reject(new Error(this.errorMessage))
            }
          })
        } else {
          this.token = localStorage.getItem('token')
          resolve(this.token)
        }
      })
      return promesa
    }
  
    //Se guardan los registros de las categorías para la universidad dada
    saveItems(faltantes: any[], IdUniversidad) {
      this.faltantesMensaje = faltantes
      this.adminService.saveItems(faltantes, this.url_Servicios_backend.UrlApiRest).subscribe(data => {
        this.getServicios(IdUniversidad).then(() => {
          this.procesarInformacion(IdUniversidad)
        })
      })
  
    }
  
  }
  