import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../../shared/models/product.model';

describe('CartService', () => {
  let service: CartService;
  let mockProduct: Product;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    
    // Clear localStorage
    localStorage.removeItem('cart');
    
    // Reset cart
    service.clearCart();
    
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

  it('should add item to cart', (done) => {
    service.addToCart(mockProduct, 1);
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].product.id).toBe(mockProduct.id);
      expect(items[0].quantity).toBe(1);
      done();
    });
  });

  it('should increase quantity when adding existing item', (done) => {
    service.addToCart(mockProduct, 1);
    service.addToCart(mockProduct, 2);
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(3);
      done();
    });
  });

  it('should update item quantity', (done) => {
    service.addToCart(mockProduct, 1);
    service.updateQuantity(mockProduct.id, 5);
    
    service.getCartItems().subscribe(items => {
      expect(items[0].quantity).toBe(5);
      done();
    });
  });

  it('should remove item when quantity set to 0', (done) => {
    service.addToCart(mockProduct, 1);
    service.updateQuantity(mockProduct.id, 0);
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
      done();
    });
  });

  it('should remove item from cart', (done) => {
    service.addToCart(mockProduct, 1);
    service.removeFromCart(mockProduct.id);
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
      done();
    });
  });

  it('should clear cart', (done) => {
    service.addToCart(mockProduct, 1);
    service.clearCart();
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
      done();
    });
  });

  it('should calculate cart total correctly', (done) => {
    service.addToCart(mockProduct, 2);
    
    service.getCartItems().subscribe(() => {
      expect(service.getCartTotal()).toBe(mockProduct.price * 2);
      done();
    });
  });

  it('should calculate cart item count correctly', (done) => {
    service.addToCart(mockProduct, 3);
    
    service.getCartItems().subscribe(() => {
      expect(service.getCartItemsCount()).toBe(3);
      done();
    });
  });
});