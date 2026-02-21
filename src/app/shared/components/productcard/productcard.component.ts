import { CartService } from './../../../features/services/cart/cart.service';
import { Component, inject, input, OnInit } from '@angular/core';
import { Product } from '../../models/Iproducts';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/services/wishlist/wishlist.service';

@Component({
  selector: 'app-productcard',
  imports: [RouterLink],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.scss',
})
export class ProductcardComponent implements OnInit {
  product = input<Product>({} as Product);

  cartService: CartService = inject(CartService);
  toastr = inject(ToastrService);
  private wishlistService = inject(WishlistService);

  isFav = false;

  ngOnInit(): void {
    this.checkIfInWishlist();
  }

  checkIfInWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (res: any) => {
        this.isFav = res.data.some((p: any) => p._id === this.product().id);
      },
      error: () => {},
    });
  }


  toggleWishlist() {
    if (this.isFav) {
      this.wishlistService.removeFromWishlist(this.product().id).subscribe({
        next: () => {
          this.isFav = false;
          this.toastr.info('Removed from wishlist');
        },
      });
    } else {
      this.wishlistService.addToWishlist(this.product().id).subscribe({
        next: () => {
          this.isFav = true;
          this.toastr.success('Added to wishlist');
        },
      });
    }
  }

  addproducttoCart(productId: string) {
    this.cartService.addproducttoCart(productId).subscribe((res: any) => {
      this.toastr.success(res.message, '', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center',
      });

      this.cartService.noOfCartItems.next(res.numOfCartItems);
    });
  }
}
