import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private logued:boolean

  constructor(private router:Router){

  }
  validateLogued(logued:boolean){
    this.logued = logued
  }

  logout(log_out:boolean){
    console.log('cerrar')
    this.logued = !log_out
    this.router.navigate(['/'])
  }

}


