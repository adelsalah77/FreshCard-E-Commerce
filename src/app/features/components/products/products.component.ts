import { ProductcardComponent } from '../../../shared/components/productcard/productcard.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/Product/Product.service';
import { Product } from '../../../shared/models/Iproducts';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, ProductcardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products = signal<Product[]>([]);
  loading = signal<boolean>(true);

  search = signal<string>('');
  sort = signal<string>('default');

  currentPage = signal<number>(1);
  totalPages = signal<number>(1);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(page: number = 1) {
    this.loading.set(true);

    this.productService.getAllProducts(page).subscribe({
      next: (res: any) => {
        let data = res.data;

        // Sorting
        if (this.sort() === 'priceLow') data = data.sort((a: any, b: any) => a.price - b.price);
        if (this.sort() === 'priceHigh') data = data.sort((a: any, b: any) => b.price - a.price);
        if (this.sort() === 'rating')
          data = data.sort((a: any, b: any) => b.ratingsAverage - a.ratingsAverage);

        this.products.set(data);
        this.currentPage.set(res.metadata.currentPage);
        this.totalPages.set(res.metadata.numberOfPages);
        this.loading.set(false);
      },
    });
  }

  addToCart(product: Product) {
    const currentProducts = this.cartService.getCartProducts();
    this.cartService.setCartProducts([...currentProducts, product]);
  }

  onSearch() {
    this.loadProducts(1);
  }

  changeSort(value: string) {
    this.sort.set(value);
    this.loadProducts(this.currentPage());
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) this.loadProducts(this.currentPage() + 1);
  }

  prevPage() {
    if (this.currentPage() > 1) this.loadProducts(this.currentPage() - 1);
  }
}
