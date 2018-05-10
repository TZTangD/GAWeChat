import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'phoneFormat'})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
      if(value){
        return value.substr(0,3) + '****' + value.substr(7);
      }
      return value;
  }
}