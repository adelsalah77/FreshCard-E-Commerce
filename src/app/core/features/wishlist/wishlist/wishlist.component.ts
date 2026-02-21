import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../../../features/services/wishlist/wishlist.service';
import { Product } from '../../../../shared/models/Iproducts';
import { ProductcardComponent } from '../../../../shared/components/productcard/productcard.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, ProductcardComponent],
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  private wishlistService = inject(WishlistService);

  wishlistProducts = signal<Product[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (res: { data: Product[] }) => {
        this.wishlistProducts.set(res.data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
