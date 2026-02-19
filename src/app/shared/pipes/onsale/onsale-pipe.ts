import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onsale',
})
export class OnsalePipe implements PipeTransform {
  transform(titile: string): string {
    return `On Sale : ${titile}  `;
  }
}
