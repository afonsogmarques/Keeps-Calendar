import { Pipe, PipeTransform } from '@angular/core';
import { DateService } from '../services/dateService/date.service';

@Pipe({
  name: 'dateString'
})
export class DateStringPipe implements PipeTransform {

  constructor(private dateService:DateService) {}

  transform(value: number, month: number, year: number): string {
    return this.dateService.getDateStr(value, month, year);
  }

}
