import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { User } from '../../../shared/models/user.model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock: any;
  let cartServiceMock: any;
  
  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User'
  };

  beforeEach(async () => {
    authServiceMock = {
      currentUser$: of(null),
      logout: jasmine.createSpy('logout')
    };
    
    cartServiceMock = {
      getCartItems: () => of([]),
      getCartItemsCount: () => 0
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: CartService, useValue: cartServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display login and register links when not authenticated', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.login-btn')).toBeTruthy();
    expect(compiled.querySelector('.register-btn')).toBeTruthy();
    expect(compiled.querySelector('.logout-btn')).toBeNull();
  });

  it('should display user info and logout button when authenticated', () => {
    authServiceMock.currentUser$ = of(mockUser);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.welcome-text').textContent).toContain('Hello, Test');
    expect(compiled.querySelector('.logout-btn')).toBeTruthy();
    expect(compiled.querySelector('.login-btn')).toBeNull();
    expect(compiled.querySelector('.register-btn')).toBeNull();
  });

  it('should call logout method when logout button is clicked', () => {
    authServiceMock.currentUser$ = of(mockUser);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const logoutButton = compiled.querySelector('.logout-btn');
    logoutButton.click();
    
    expect(authServiceMock.logout).toHaveBeenCalled();
  });

  it('should toggle mobile menu when button is clicked', () => {
    const compiled = fixture.nativeElement;
    const menuButton = compiled.querySelector('.mobile-menu-btn');
    
    expect(component.isMenuOpen).toBeFalse();
    menuButton.click();
    expect(component.isMenuOpen).toBeTrue();
    menuButton.click();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should display cart count when items are in cart', () => {
    spyOn(cartServiceMock, 'getCartItemsCount').and.returnValue(3);
    component.ngOnInit();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.cart-count').textContent.trim()).toBe('3');
  });
});