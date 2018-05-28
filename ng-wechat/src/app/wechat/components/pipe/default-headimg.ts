import { PipeTransform, Pipe } from "@angular/core";
import { AppConsts } from "../../../services";

@Pipe({name: 'defaultImg'})
export class DefaultHeadImgPipe implements PipeTransform {
  transform(value: string): string {
      if(value){
        return value;
      }else{
        return './assets/images/timg-4.jpeg';
      }
  }
}