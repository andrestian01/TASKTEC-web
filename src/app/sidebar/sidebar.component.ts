// sidebar.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

  // get username(): string {
  //   return this.authService.getUsername();
  // }

  // get email(): string {
  //   return this.authService.getEmail();
  // }
}
