import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Product[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();
  
  constructor() {
    // Load favorites from localStorage if exists
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favoritesSubject.next(JSON.parse(storedFavorites));
    }
  }

  getFavorites(): Observable<Product[]> {
    return this.favorites$;
  }

  addToFavorites(product: Product): void {
    const currentFavorites = this.favoritesSubject.value;
    
    // Check if product is already in favorites
    if (!currentFavorites.some(p => p.id === product.id)) {
      const updatedFavorites = [...currentFavorites, product];
      this.favoritesSubject.next(updatedFavorites);
      this.saveFavoritesToLocalStorage();
    }
  }

  removeFromFavorites(productId: number): void {
    const currentFavorites = this.favoritesSubject.value;
    const updatedFavorites = currentFavorites.filter(p => p.id !== productId);
    
    this.favoritesSubject.next(updatedFavorites);
    this.saveFavoritesToLocalStorage();
  }

  isFavorite(productId: number): boolean {
    return this.favoritesSubject.value.some(p => p.id === productId);
  }

  clearFavorites(): void {
    this.favoritesSubject.next([]);
    localStorage.removeItem('favorites');
  }

  private saveFavoritesToLocalStorage(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favoritesSubject.value));
  }
}