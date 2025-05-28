import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { Product } from '../../shared/models/product.model';
// import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: true,
  imports: [CommonModule,]
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  isLoading = true;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(productId);
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
      this.isLoading = false;
    });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
    }
  }

  toggleFavorite(): void {
    if (this.product) {
      if (this.isInFavorites()) {
        this.favoritesService.removeFromFavorites(this.product.id);
      } else {
        this.favoritesService.addToFavorites(this.product);
      }
    }
  }

  isInFavorites(): boolean {
    return this.product ? this.favoritesService.isFavorite(this.product.id) : false;
  }

  updateQuantity(value: number): void {
    this.quantity = Math.max(1, Math.min(this.quantity + value, this.product?.stock || 1));
  }
}