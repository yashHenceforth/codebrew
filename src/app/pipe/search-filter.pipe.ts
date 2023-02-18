import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], args: any): any {
    if(args > 0) {
      const data = value.filter(item => item.min_price > Number(args));
      return data;
    }
     else {
      return value;
     }
  }

}
