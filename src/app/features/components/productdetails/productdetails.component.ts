import { Product } from './../../../shared/models/Iproducts';
import { ProductService } from '../../services/Product/Product.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipes/onsale/onsale-pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-productdetails',
  imports: [DatePipe, OnsalePipe],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
})
export class ProductdetailsComponent implements OnInit {
  cartService: CartService = inject(CartService);
  date = new Date();
  product: WritableSignal<Product> = signal<Product>({} as Product);
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data) => {
      this.getspecificProduct(data.get('id')!);
    });
  }

  toastr = inject(ToastrService);

  addproducttoCart(productId: string) {
    this.cartService.addproducttoCart(productId).subscribe((res: any) => {
      this.toastr.success(res.message, '', { timeOut: 3000, progressBar: true });
    });
  }

  getspecificProduct(id: string) {
    this.productService.getspasificProduct(id).subscribe((res) => {
      this.product.set(res.data);
      console.log(this.product());
    });
  }
}
