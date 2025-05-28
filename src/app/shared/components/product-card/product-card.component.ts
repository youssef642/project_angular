import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../../core/services/cart.service';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  
  constructor(
    private router: Router,
    private cartService: CartService,
    private favoritesService: FavoritesService
  ) { }

  navigateToProduct(): void {
    this.router.navigate(['/products', this.product.id]);
  }

  addToCart(event: Event): void {
    event.stopPropagation();
    this.cartService.addToCart(this.product);
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    
    if (this.isInFavorites()) {
      this.favoritesService.removeFromFavorites(this.product.id);
    } else {
      this.favoritesService.addToFavorites(this.product);
    }
  }

  isInFavorites(): boolean {
    return this.favoritesService.isFavorite(this.product.id);
  }
}