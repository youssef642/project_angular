import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PageNotFoundComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 404 error code', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.error-code').textContent).toBe('404');
  });

  it('should have a link to the homepage', () => {
    const compiled = fixture.nativeElement;
    const link = compiled.querySelector('a');
    
    expect(link).toBeTruthy();
    expect(link.getAttribute('routerLink')).toBe('/');
    expect(link.textContent).toContain('Go to Homepage');
  });
});