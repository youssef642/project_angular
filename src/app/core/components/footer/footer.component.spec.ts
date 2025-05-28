import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the current year in the copyright text', () => {
    const currentYear = new Date().getFullYear();
    const compiled = fixture.nativeElement;
    
    expect(component.currentYear).toBe(currentYear);
    expect(compiled.querySelector('.copyright').textContent).toContain(currentYear.toString());
  });

  it('should have links to main pages', () => {
    const compiled = fixture.nativeElement;
    const links = compiled.querySelectorAll('.footer-links a');
    
    const hasHomeLink = Array.from(links).some(link => 
      (link as Element).getAttribute('routerLink') === '/' && (link as Element).textContent === 'Home'
    );
    
    const hasFavoritesLink = Array.from(links).some(link => 
      (link as Element).getAttribute('routerLink') === '/favorites' && (link as Element).textContent === 'Favorites'
    );
    
    const hasCartLink = Array.from(links).some(link => 
      (link as Element).getAttribute('routerLink') === '/cart' && (link as Element).textContent === 'Cart'
    );
    
    expect(hasHomeLink).toBeTrue();
    expect(hasFavoritesLink).toBeTrue();
    expect(hasCartLink).toBeTrue();
  });

  it('should have social media links', () => {
    const compiled = fixture.nativeElement;
    const socialLinks = compiled.querySelectorAll('.social-link');
    
    expect(socialLinks.length).toBe(3);
  });

  it('should have a newsletter subscription form', () => {
    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('.newsletter-input')).toBeTruthy();
    expect(compiled.querySelector('.newsletter-button')).toBeTruthy();
    expect(compiled.querySelector('.newsletter-button').textContent).toBe('Subscribe');
  });
});