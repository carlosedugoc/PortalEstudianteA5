import { Component, OnInit } from '@angular/core';

declare var llamarEventosMainJS: any
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      llamarEventosMainJS();

    },1000)
  }

}
