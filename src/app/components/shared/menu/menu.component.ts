import { Component, OnInit } from '@angular/core';

declare var llamarEventosMainJS: any
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      llamarEventosMainJS();
    },1000)
  }

}
