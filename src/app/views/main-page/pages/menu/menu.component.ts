import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../../../core/services/menu.service';
import { Menu } from '../../../../core/models/menu.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  standalone: true,
})
export class MenuComponent {
  constructor(private router: Router) {}
  private menuService = inject(MenuService);
  isLoggedIn = false;
  menus: Menu[] = [];
  ngOnInit(): void {
    this.menuService.getMenu().subscribe((data) => {
      this.menus = data;
    });
  }
  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.isLoggedIn = false;
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onOptions() {}
}
