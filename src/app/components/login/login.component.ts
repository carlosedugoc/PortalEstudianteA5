import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../../app.models";

declare var llamarEventosMainJS: any
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { 
    this.getUsuarios()
  }

  ngOnInit() {
    setTimeout(()=>{
      llamarEventosMainJS();
    },1000)
  }
//public logued:boolean
public user:User
public users:User[]
@Output() logued: EventEmitter<boolean> =  new EventEmitter<boolean>();

//Login para ambiente local de desarrollo
loginDev(user: string) {
  this.logued.emit(true)
  sessionStorage.setItem('logued', 'true')
  this.user = this.users.find(item => item.userId == user)
  sessionStorage.setItem('user', JSON.stringify(this.user))
  // this.switchLanguage(this.language)
  document.getElementById('estilos')['href'] = `../assets/css/estilos${this.user.university}.css`
  // cambiarPosicionHojaEstilos()

  // this.getMenu()
  if (this.user.rol != "2") {
    this.router.navigate(['/services'])
  } else {
    // this.cargarInfoEstudiante();
    this.router.navigate(['/dashboard'])
  }
}

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
}
