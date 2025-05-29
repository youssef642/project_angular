// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../../core/services/auth-api.service.ts.service';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule , HttpClientJsonpModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthApiService, private router: Router) {}

  onLogin() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => this.errorMessage = err.error.message
    });
  }
}
