import { PipeTransform, Pipe } from '@angular/core';
interface IAddress {
  address1: string;
  address2: string;
  city: string;
}
@Pipe({
  name: 'formatAddress',
})
export class FormatPipeAddress implements PipeTransform {
  transform(address: IAddress, paral1?: string) {
    console.log(address, paral1);

    return address.address1 + ' ' + address.address2 + ' ' + address.city;
  }
}
