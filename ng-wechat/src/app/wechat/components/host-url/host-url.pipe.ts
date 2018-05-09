import { Pipe, PipeTransform } from '@angular/core';
import { AppConsts } from '../../../services';

@Pipe({name: 'hostUrl'})
export class HostUrlPipe implements PipeTransform {
  transform(value: string): string {
      if(value){
        return AppConsts.remoteServiceBaseUrl + value;
      }
      return value;
  }
}