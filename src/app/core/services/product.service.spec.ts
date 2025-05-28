import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all products', (done) => {
    service.getProducts().subscribe(products => {
      expect(products.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should return a product by id', (done) => {
    service.getProductById(1).subscribe(product => {
      expect(product).toBeTruthy();
      expect(product?.id).toBe(1);
      done();
    });
  });

  it('should return undefined for non-existent product id', (done) => {
    service.getProductById(999).subscribe(product => {
      expect(product).toBeUndefined();
      done();
    });
  });

  it('should filter products by category', (done) => {
    service.getProductsByCategory('Electronics').subscribe(products => {
      expect(products.length).toBeGreaterThan(0);
      expect(products.every(p => p.category === 'Electronics')).toBeTrue();
      done();
    });
  });

  it('should search products by term', (done) => {
    service.searchProducts('headphones').subscribe(products => {
      expect(products.length).toBeGreaterThan(0);
      expect(products.some(p => 
        p.name.toLowerCase().includes('headphones') || 
        p.description.toLowerCase().includes('headphones')
      )).toBeTrue();
      done();
    });
  });
});