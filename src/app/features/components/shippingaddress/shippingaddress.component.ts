import { CartService } from './../../services/cart/cart.service';
import { OrderService } from './../../services/order/order.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shippingaddress',
  imports: [ReactiveFormsModule],
  templateUrl: './shippingaddress.component.html',
  styleUrl: './shippingaddress.component.scss',
})
export class ShippingaddressComponent {
  fb: FormBuilder = new FormBuilder();
  orderService: OrderService = inject(OrderService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  cartService: CartService = inject(CartService);

  shippingaddressform: FormGroup = this.fb.group({
    details: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    city: [null, [Validators.required]],
  });

  submitShippingAddress() {
    if (!this.shippingaddressform.valid) return;
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const cartId = params.get('id')!;
        const selectedProducts = this.cartService.getCartProducts();
        console.log('Selected Products for Cash Payment:', selectedProducts);
        this.orderService.creatCashOrder(cartId, this.shippingaddressform.value).subscribe({
          next: (res) => {
            this.cartService.clearLocalCart();
            this.router.navigate(['/allorders']);
          },
          error: (err) => {
            console.error('Error creating cash order:', err);
          },
        });
      },
      error: (err) => console.error('Error reading cartId from route:', err),
    });
  }

  sunmitCashOrder() {
    if (!this.shippingaddressform.valid) return;
    this.activatedRoute.paramMap.subscribe({
      next: (data) => {
        this.orderService.checkOut(data.get('id')!, this.shippingaddressform.value).subscribe({
          next: (res) => {
            window.open(res.session.url, '_self')?.focus();
          },
        });
      },
    });
  }
}
