import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../../../shared/services/brand/brand.service';


@Component({
  selector: 'app-brand-details',
  standalone: true,
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private brandService = inject(BrandService);

  brand = signal<any>(null);
  loading = signal<boolean>(true);

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.brandService.getBrandById(id).subscribe({
        next: (res: any) => {
          this.brand.set(res.data);
          this.loading.set(false);
        }
      });
    }
  }
}