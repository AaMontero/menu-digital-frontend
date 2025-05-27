import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css'],
})
export class GenericTableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: { key: string; label: string, isAction?: boolean, isSelection?: boolean }[] = [];
  @Output() rowClicked = new EventEmitter<T>();
  onRowClick(row: any) {
    console.log('Fila clickeada:', row);
  }

  onEdit(row: any) {
    console.log('Editar:', row);
  }

  onDelete(row: any) {
    console.log('Eliminar:', row);
  }
}
