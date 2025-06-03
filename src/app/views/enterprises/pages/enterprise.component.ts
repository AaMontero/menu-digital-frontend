import { Component, inject } from '@angular/core';
import { GenericTableComponent } from '../../../shared/generic-table/generic-table.component';
import { EnterpriseService } from '../../../core/services/enterprise.service';
import { Enterprise } from '../../../core/models/enterprise.model';
import { AuthService } from '../../../core/services/auth.service';
import { MenuService } from '../../../core/services/menu.service';

@Component({
  selector: 'app-enterprises',
  imports: [GenericTableComponent],
  templateUrl: './enterprise.component.html',
  styleUrl: './enterprise.component.css',
  standalone: true,
})
export class EnterprisesComponent {
  private enterpriseService = inject(EnterpriseService);
  private menuService = inject(MenuService);
  enterprises: Enterprise[] = [];

  columns: { key: keyof Enterprise | 'actions'; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'description', label: 'Descripción' },
    { key: 'logo_url', label: 'Logo' },
    { key: 'actions', label: 'Acciones' },
  ];

  ngOnInit(): void {
    
    this.enterpriseService.getEnterprises().subscribe((data) => {
      this.enterprises = data;
    });
  }

  onRowClick(row: Enterprise) {
    console.log('Fila seleccionada:', row);
  }
}
