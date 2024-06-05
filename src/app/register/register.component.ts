import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.username, this.password).subscribe(
      (response) => {
        if (response && response.token) {
          this.authService.saveToken(response.token, this.username);
          this.router.navigate(['/tasks']);
        } else {
          // Handle error or unexpected response
        }
      },
      (error) => {
        // Handle error
        this.error = error.message;
      }
    );
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
