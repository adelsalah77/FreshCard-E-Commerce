import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartData } from '../../../shared/models/Icart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './allorders.component.html',
})
export class AllOrdersComponent implements OnInit {
  cartService: CartService = inject(CartService);

  cartData: WritableSignal<CartData | null> = signal<CartData | null>(null);

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartData.set(res.data);
      },
    });
  }

  updateCount(productId: string, count: number) {
    if (count < 1) return;

    this.cartService.updateProductCartCount(productId, count.toString()).subscribe({
      next: (res) => {
        this.cartData.set(res.data);
        this.cartService.noOfCartItems.next(res.numOfCartItems);
      },
    });
  }

  removeItem(productId: string) {
    this.cartService.removeSpecificProductFromCart(productId).subscribe({
      next: (res) => {
        this.cartData.set(res.data);
        this.cartService.noOfCartItems.next(res.numOfCartItems);
      },
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.cartData.set(null);
        this.cartService.noOfCartItems.next(0);
      },
    });
  }
}
