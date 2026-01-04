import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../../services/get-data.service';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string = '';
cartItems: any[] = [];
subtotal: number = 0;
  constructor(
    private route: ActivatedRoute,
    private getDataService: GetDataService
  ) {}

  ngOnInit(): void {
    this.getDataService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.updateCategory();
    });

    // Ecoute du changement de catégorie dans l'URL
    this.route.queryParams.subscribe(params => {
      this.category = params['category'] ?? '';
      this.filterProductsByCategory();
    });
  }

  private updateCategory(): void {
    this.category = this.route.snapshot.queryParamMap.get('category') ?? '';
    this.filterProductsByCategory();
  }

  private filterProductsByCategory(): void {
    this.filteredProducts = this.products.filter(
      product => product.category.toLowerCase() === this.category.toLowerCase()
    );
  }

  hasLowStock(product: Product): boolean {
    return product.sizes.some(size => size.quantity < 10);
  }
  scrollToProducts(): void {
  const section = document.getElementById('scroll-products');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
getBannerImagePath(): string {
  const formatted = decodeURIComponent(this.category)
    .toLowerCase()
    .replace(/ /g, '-')    // espaces → tirets
    .replace(/[^a-z0-9\-]/g, ''); // supprime caractères spéciaux

  return 'assets/banners/' + formatted + '.jpg';
}


}
