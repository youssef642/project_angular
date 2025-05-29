// register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../../core/services/auth-api.service.ts.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthApiService, private router: Router) {}

  onRegister() {
    const newUser = {
      username: this.email, // or use another property as username if needed
      password: this.password
    };

    this.authService.register(newUser).subscribe({
      next: () => {
        console.log('Registration successful');
        this.router.navigate(['/login']); // بعد التسجيل يروح للـ login
      },
      error: err => {
        alert(err.message);
      }
    });
  }
}
