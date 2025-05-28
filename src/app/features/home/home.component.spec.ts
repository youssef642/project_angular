import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Product } from '../../shared/models/product.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productServiceMock: any;
  
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 99.99,
      imageUrl: 'test1.jpg',
      category: 'Electronics',
      rating: 4.5,
      stock: 10,
      features: ['Feature 1', 'Feature 2']
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 149.99,
      imageUrl: 'test2.jpg',
      category: 'Fashion',
      rating: 4.2,
      stock: 5,
      features: ['Feature 1', 'Feature 2']
    }
  ];

  beforeEach(async () => {
    productServiceMock = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of(mockProducts)),
      getProductsByCategory: jasmine.createSpy('getProductsByCategory').and.returnValue(of([mockProducts[0]])),
      searchProducts: jasmine.createSpy('searchProducts').and.returnValue(of([mockProducts[1]]))
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        HomeComponent,
        ProductCardComponent,
        LoadingSpinnerComponent
      ],
      providers: [
        { provide: ProductService, useValue: productServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(productServiceMock.getProducts).toHaveBeenCalled();
    expect(component.categories.length).toBe(2);
    expect(component.categories).toContain('Electronics');
    expect(component.categories).toContain('Fashion');
  });

  it('should filter products by category', () => {
    component.filterByCategory('Electronics');
    expect(productServiceMock.getProductsByCategory).toHaveBeenCalledWith('Electronics');
    expect(component.selectedCategory).toBe('Electronics');
  });

  it('should load all products when empty category selected', () => {
    component.filterByCategory('');
    expect(productServiceMock.getProducts).toHaveBeenCalled();
    expect(component.selectedCategory).toBe('');
  });

  it('should search products', () => {
    component.searchTerm = 'Product 2';
    component.search();
    expect(productServiceMock.searchProducts).toHaveBeenCalledWith('Product 2');
  });

  it('should load all products when search term is empty', () => {
    component.searchTerm = '';
    component.search();
    expect(productServiceMock.getProducts).toHaveBeenCalled();
  });
});