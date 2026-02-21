import { Component, inject, OnInit, signal } from '@angular/core';

import { Router } from '@angular/router';
import { BrandService } from '../../../shared/services/brand/brand.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private brandService = inject(BrandService);
  private router = inject(Router);

  brands = signal<any[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands() {
    this.loading.set(true);

    this.brandService.getAllBrands().subscribe({
      next: (res) => {
        this.brands.set(res.data);
        this.loading.set(false);
      },
    });
  }

  openBrand(id: string) {
    this.router.navigate(['/brand-details', id]);
  }
}
