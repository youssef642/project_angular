import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<User | null>;
  cartItemsCount: number = 0;
  isMenuOpen: boolean = false;
  
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(() => {
      this.cartItemsCount = this.cartService.getCartItemsCount();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}