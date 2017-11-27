import {Component, OnInit, Output, EventEmitter }from '@angular/core'; 

@Component( {
selector:'app-header', 
templateUrl:'./header.component.html', 
styles:[]
})
export class HeaderComponent implements OnInit {
@Output()log_out:EventEmitter < boolean >  = new EventEmitter < boolean > (); 
constructor() {}

ngOnInit() {
}

logout() {
  this.log_out.emit(true)
}

}
