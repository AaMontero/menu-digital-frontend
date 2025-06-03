import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../../../core/services/menu.service';
import { Menu, MenuDto } from '../../../../core/models/menu.module';
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
  menus: MenuDto[] = [];
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      console.log(payload);

      // Asegúrate de que exista el campo idUser en el payload
      if (payload.idUser) {
        this.menuService.getMenuByUser(payload.idUser).subscribe((data) => {
          this.menus = data;
        });
      } else {
        console.warn('idUser no está presente en el token');
      }
    } else {
      console.warn('Token no encontrado en localStorage');
    }
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
