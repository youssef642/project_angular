import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { Product } from '../../shared/models/product.model';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let mockProduct: Product;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
    
    // Clear localStorage
    localStorage.removeItem('favorites');
    
    // Reset favorites
    service.clearFavorites();
    
    // Create mock product
    mockProduct = {
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      price: 99.99,
      imageUrl: 'test.jpg',
      category: 'Test',
      rating: 4.5,
      stock: 10,
      features: ['Feature 1', 'Feature 2']
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to favorites', (done) => {
    service.addToFavorites(mockProduct);
    
    service.getFavorites().subscribe(favorites => {
      expect(favorites.length).toBe(1);
      expect(favorites[0].id).toBe(mockProduct.id);
      done();
    });
  });

  it('should not add duplicate product to favorites', (done) => {
    service.addToFavorites(mockProduct);
    service.addToFavorites(mockProduct);
    
    service.getFavorites().subscribe(favorites => {
      expect(favorites.length).toBe(1);
      done();
    });
  });

  it('should remove product from favorites', (done) => {
    service.addToFavorites(mockProduct);
    service.removeFromFavorites(mockProduct.id);
    
    service.getFavorites().subscribe(favorites => {
      expect(favorites.length).toBe(0);
      done();
    });
  });

  it('should check if product is in favorites', (done) => {
    service.addToFavorites(mockProduct);
    
    service.getFavorites().subscribe(() => {
      expect(service.isFavorite(mockProduct.id)).toBeTrue();
      expect(service.isFavorite(999)).toBeFalse();
      done();
    });
  });

  it('should clear all favorites', (done) => {
    service.addToFavorites(mockProduct);
    service.clearFavorites();
    
    service.getFavorites().subscribe(favorites => {
      expect(favorites.length).toBe(0);
      done();
    });
  });
});