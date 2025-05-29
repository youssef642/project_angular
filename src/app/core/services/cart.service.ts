import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../../shared/models/cart-item.model';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();
  
  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItemsSubject.next(JSON.parse(storedCart));
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartItemsSubject.value;
    const existingItemIndex = currentCart.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex !== -1) {
      const updatedCart = [...currentCart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + quantity
      };
      this.cartItemsSubject.next(updatedCart);
    } else {
      const newCart = [...currentCart, { product, quantity }];
      this.cartItemsSubject.next(newCart);
    }
    
    this.saveCartToLocalStorage();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    );
    
    this.cartItemsSubject.next(updatedCart);
    this.saveCartToLocalStorage();
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.filter(item => item.product.id !== productId);
    
    this.cartItemsSubject.next(updatedCart);
    this.saveCartToLocalStorage();
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cart');
  }

  getCartTotal(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + (item.product.price * item.quantity), 
      0
    );
  }

  getCartItemsCount(): number {
    return this.cartItemsSubject.value.reduce(
      (count, item) => count + item.quantity, 
      0
    );
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItemsSubject.value));
  }
}