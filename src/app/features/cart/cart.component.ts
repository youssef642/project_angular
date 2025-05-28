import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../shared/models/cart-item.model';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  isLoading = true;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.isLoading = false;
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}