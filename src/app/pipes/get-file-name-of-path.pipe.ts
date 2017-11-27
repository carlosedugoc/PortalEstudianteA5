import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFileNameOfPath'
})
export class GetFileNameOfPathPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
