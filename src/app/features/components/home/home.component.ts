import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { CategorysliderComponent } from '../../../shared/components/categoryslider/categoryslider.component';
import { ProductService } from '../../services/Product/Product.service';
import { Product } from '../../../shared/models/Iproducts';
import { ProductcardComponent } from '../../../shared/components/productcard/productcard.component';
import { SearchproductPipe } from '../../../shared/pipes/searchproduct/searchproduct-pipe';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    HomeSliderComponent,
    CategorysliderComponent,
    ProductcardComponent,
    SearchproductPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  searchProduct: string = '';
  productlist: WritableSignal<Product[]> = signal<Product[]>([]);
  productService: ProductService = inject(ProductService);

  ngOnInit(): void {
    this.getAllproducts();
  }
  getAllproducts() {
    this.productService.getAllProducts().subscribe((res) => {
      this.productlist.set(res.data);
      console.log(res.data);
    });
  }
}
