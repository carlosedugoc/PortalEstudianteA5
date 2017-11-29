import { Pipe, PipeTransform } from '@angular/core';
import { Menu, TipoMenu } from "../app.models";

@Pipe({
  name: 'filterMenu'
})
export class FilterMenuPipe implements PipeTransform {

  transform(value: TipoMenu[], tipoMenu:number): Menu[] {
    if (!value){ return }
    return value.find(item=>item.id == tipoMenu).options
  }

}
