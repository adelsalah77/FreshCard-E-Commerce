import { CartData } from '../../../shared/models/Icart';
import { CartService } from './../../services/cart/cart.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartData: WritableSignal<CartData> = signal<CartData>({} as CartData);
  cartService: CartService = inject(CartService);

  ngOnInit(): void {
    this.getLoggedUserCart();
  }

  getLoggedUserCart() {
    this.cartService.getLoggedUserCart().subscribe((res) => {
      this.cartData.set(res.data);
      console.log(this.cartData());
    });
  }

  updateProductCartCount(productId: string, count: number) {
    this.cartService.updateProductCartCount(productId, count.toString()).subscribe({
      next: (res) => {
        this.cartData.set(res.data);
        this.cartService.noOfCartItems.next(res.numOfCartItems);
      },
    });
  }

  removeSpecificProductFromCart(productId: string) {
    this.cartService.removeSpecificProductFromCart(productId).subscribe({
      next: (res) => {
        this.cartData.set(res.data);
        this.cartService.noOfCartItems.next(res.numOfCartItems);
      },
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        this.getLoggedUserCart();
        this.cartService.noOfCartItems.next(0);
      },
    });
  }
}
