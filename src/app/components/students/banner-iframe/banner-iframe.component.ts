import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-banner-iframe',
  templateUrl: './banner-iframe.component.html'
})
export class BannerIframeComponent implements OnInit {
  public url:string
  public servicio:string

  constructor(private route:ActivatedRoute) {
    this.route.params.subscribe((parametros)=>{
      console.log(parametros['id'])
      this.servicio = parametros['id']
      this.url = `http://localhost:8085/banner/bannerService.html?serv=${this.servicio}`
    })
   }

  ngOnInit() {
  }

}
