import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GroupingComponentGeneric } from '../../../../core/models/interfaces/menu.interface';

@Component({
  selector: 'drag-drop-edit-group',
  templateUrl: './drag-drop-edit-group.component.html',
  styleUrl: './drag-drop-edit-group.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class DragDropEditComponent implements OnChanges {
  @Input()
  selectedGroup: GroupingComponentGeneric = new GroupingComponentGeneric();
  @Output() colorChanged = new EventEmitter<string>();
  @Output() columnsChanged = new EventEmitter<number>();

  selectedColor = '';
  listColors: string[] = ['#1E9CD5', '#0D5580', '#686868'];

  selectedColumns = 1;
  listColumns: number[] = [1, 2, 3];

  ngOnInit(): void {
    if (this.selectedGroup) {
      this.selectedColor = this.selectedGroup.color ?? '';
      this.selectedColumns = this.selectedGroup.columnsAmount ?? 1;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedGroup'] && this.selectedGroup) {
      this.selectedColor = this.selectedGroup.color ?? '';
      this.selectedColumns = this.selectedGroup.columnsAmount ?? 1;
    }
  }
  onColorChange(newColor: string): void {
    this.selectedColor = newColor;
    this.colorChanged.emit(newColor);
  }

  onColumnsChange(newColumns: number): void {
    this.selectedColumns = newColumns;
    this.columnsChanged.emit(newColumns);
  }
}
