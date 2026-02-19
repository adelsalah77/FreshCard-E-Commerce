import { CartService } from './../../../features/services/cart/cart.service';
import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/Iproducts';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productcard',
  imports: [RouterLink],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.scss',
})
export class ProductcardComponent {
  product = input<Product>({} as Product);

  cartService: CartService = inject(CartService);
  toastr = inject(ToastrService);

  addproducttoCart(productId: string) {
    this.cartService.addproducttoCart(productId).subscribe((res) => {
      this.toastr.success(res.message, '', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center',
      });

      this.cartService.noOfCartItems.next(res.numOfCartItems);
    });
  }
}
