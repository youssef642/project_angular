import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Mock users for demo purposes
  private users: User[] = [
    {
      id: 1,
      email: 'user@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe'
    }
  ];

  constructor() {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    // Simulate API call
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      return of(user).pipe(
        delay(800), // Simulate network delay
        tap(user => {
          // Remove password before storing
          const { password, ...userWithoutPassword } = user;
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
          this.currentUserSubject.next(userWithoutPassword as User);
        })
      );
    }
    
    return throwError(() => new Error('Invalid email or password'));
  }

  register(user: User): Observable<User> {
    console.log('Register called with:', user);
    // Check if email already exists
    if (this.users.some(u => u.email === user.email)) {
      return throwError(() => new Error('Email already exists'));
    }
    
    // Simulate API call
    const newUser = {
      ...user,
      id: this.users.length + 1
    };
    
    this.users.push(newUser);
    
    return of(newUser).pipe(
      delay(800), // Simulate network delay
      tap(user => {
        // Remove password before storing
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        this.currentUserSubject.next(userWithoutPassword as User);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}