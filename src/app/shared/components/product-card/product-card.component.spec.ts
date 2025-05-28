import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ProductCardComponent } from './product-card.component';
import { CartService } from '../../../core/services/cart.service';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Product } from '../../models/product.model';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let cartServiceMock: any;
  let favoritesServiceMock: any;
  let router: Router;
  
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    imageUrl: 'test.jpg',
    category: 'Test Category',
    rating: 4.5,
    stock: 10,
    features: ['Feature 1', 'Feature 2']
  };

  beforeEach(async () => {
    cartServiceMock = {
      addToCart: jasmine.createSpy('addToCart')
    };
    
    favoritesServiceMock = {
      addToFavorites: jasmine.createSpy('addToFavorites'),
      removeFromFavorites: jasmine.createSpy('removeFromFavorites'),
      isFavorite: jasmine.createSpy('isFavorite').and.returnValue(false)
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductCardComponent],
      providers: [
        { provide: CartService, useValue: cartServiceMock },
        { provide: FavoritesService, useValue: favoritesServiceMock }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to product details when clicked', () => {
    component.navigateToProduct();
    expect(router.navigate).toHaveBeenCalledWith(['/products', mockProduct.id]);
  });

  it('should add product to cart', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    
    component.addToCart(event);
    
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(cartServiceMock.addToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('should add product to favorites when not in favorites', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    favoritesServiceMock.isFavorite.and.returnValue(false);
    
    component.toggleFavorite(event);
    
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(favoritesServiceMock.isFavorite).toHaveBeenCalledWith(mockProduct.id);
    expect(favoritesServiceMock.addToFavorites).toHaveBeenCalledWith(mockProduct);
  });

  it('should remove product from favorites when in favorites', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    favoritesServiceMock.isFavorite.and.returnValue(true);
    
    component.toggleFavorite(event);
    
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(favoritesServiceMock.isFavorite).toHaveBeenCalledWith(mockProduct.id);
    expect(favoritesServiceMock.removeFromFavorites).toHaveBeenCalledWith(mockProduct.id);
  });

  it('should check if product is in favorites', () => {
    component.isInFavorites();
    expect(favoritesServiceMock.isFavorite).toHaveBeenCalledWith(mockProduct.id);
  });

  it('should display product information correctly', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('.product-name').textContent).toBe(mockProduct.name);
    expect(compiled.querySelector('.product-category').textContent).toBe(mockProduct.category);
    expect(compiled.querySelector('.product-price').textContent).toContain(mockProduct.price.toFixed(2));
    expect(compiled.querySelector('.rating-value').textContent).toBe(mockProduct.rating.toString());
  });
});