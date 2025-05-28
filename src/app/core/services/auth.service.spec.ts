import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User } from '../../shared/models/user.model';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    
    // Clear localStorage before each test
    localStorage.removeItem('currentUser');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set currentUser after successful login', (done) => {
    const testUser = {
      email: 'user@example.com',
      password: 'password123'
    };

    service.login(testUser.email, testUser.password).subscribe({
      next: (user) => {
        expect(user).toBeTruthy();
        expect(service.isAuthenticated()).toBeTrue();
        done();
      }
    });
  });

  it('should return error for invalid login', (done) => {
    service.login('wrong@example.com', 'wrongpassword').subscribe({
      error: (error) => {
        expect(error.message).toBe('Invalid email or password');
        expect(service.isAuthenticated()).toBeFalse();
        done();
      }
    });
  });

  it('should clear currentUser after logout', (done) => {
    const testUser = {
      email: 'user@example.com',
      password: 'password123'
    };

    service.login(testUser.email, testUser.password).subscribe({
      next: () => {
        expect(service.isAuthenticated()).toBeTrue();
        
        service.logout();
        expect(service.isAuthenticated()).toBeFalse();
        expect(localStorage.getItem('currentUser')).toBeNull();
        done();
      }
    });
  });

  it('should register a new user', (done) => {
    const newUser: User = {
      email: 'new@example.com',
      password: 'newpassword123',
      firstName: 'Jane',
      lastName: 'Smith'
    };

    service.register(newUser).subscribe({
      next: (user) => {
        expect(user).toBeTruthy();
        expect(service.isAuthenticated()).toBeTrue();
        done();
      }
    });
  });
});