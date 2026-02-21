import { Component, OnInit, inject, signal } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../../shared/models/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);

  categories = signal<Category[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.loading.set(true);

    this.categoryService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories.set(res.data);
        this.loading.set(false);
      },
    });
  }
}
