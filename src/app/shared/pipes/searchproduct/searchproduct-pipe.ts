import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../models/Iproducts';

@Pipe({
  name: 'searchproduct',
})
export class SearchproductPipe implements PipeTransform {
  transform(productlist: Product[], userProduct?: string): Product[] {
    return productlist.filter((product) =>
      product.title.toLowerCase().includes(userProduct?.toLowerCase() || ''),
    );
  }
}
