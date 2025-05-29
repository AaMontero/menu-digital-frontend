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
@Component({
  selector: 'app-menu',
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  standalone: true 
})
export class MenuComponent {
  private menuService = inject(MenuService);
  menus: Menu[] = [];
  ngOnInit(): void {
    this.menuService.getMenu().subscribe((data) => {
      this.menus = data;
    });
  }
}
