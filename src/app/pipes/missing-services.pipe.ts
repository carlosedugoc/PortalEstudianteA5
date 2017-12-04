import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'missingServices'
})
export class MissingServicesPipe implements PipeTransform {

  transform(value: any[], queryKind: number): any {
    if (!value){ return }
    
    let filter:any[] = []
    for(let item of value){
      if(item.serviceTypeId == queryKind){
        filter.push(item)
      }
    }
    return filter;
  }

}
