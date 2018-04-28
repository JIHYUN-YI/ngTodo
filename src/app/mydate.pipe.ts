import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mydate'
})
export class MydatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // console.log('value:' + value + ', args:' + args);
    // 첫번째 param: pipe 앞의 문자열
    // 두번째 param: mydate 다음 문자열
    return value.substring(0, 16);
  }

}
