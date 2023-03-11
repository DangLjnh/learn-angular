import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adult',
})
export class AdultPipe implements PipeTransform {
  transform(value: any): any {
    return value.filter((item: any) => item.age > 18);
  }
}
