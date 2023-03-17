import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {

  transform(
    value: number,
        ): string {
    return new Date(2023, value).toLocaleString('default', {month: 'long'});
  }

}
