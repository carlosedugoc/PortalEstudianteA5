import { Pipe, PipeTransform } from '@angular/core';
import { Servicio } from "../app.models";

@Pipe({
  name: 'filterService'
})
export class FilterServicePipe implements PipeTransform {

  transform(value: Servicio[], tipoConsulta: number): any {
    if (!value){ return }
    let filtro:Servicio[] = []
    for(let servicio of value){
      if(servicio.categoryId == tipoConsulta){
        filtro.push(servicio)
      }
    }
    return filtro;
  }

}
