import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'lib-button-generic',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule,MatTooltip, MatProgressSpinnerModule],
  templateUrl: './button-generic.component.html',
  styleUrl: './button-generic.component.css'
})
export class ButtonGenericComponent {
  @Input() text: string = 'Click';
  @Input() tooltipText?: string = '';
  @Input() disabled: boolean = false;
  @Input() customClass: string = 'button';
  @Input() customStyle: { [key: string]: any } = {};
  @Input() color: 'primary' | 'accent' | 'warn' | 'inactive' | 'error' | '' = '';
  @Input() isDarkTheme: boolean = false;
  @Input() iconColor: string = 'black';
  @Input() addLoading: boolean =false;
  @Input() loading: boolean =false;
  @Input() variant:
    | 'mat-button'
    | 'mat-raised-button'
    | 'mat-flat-button'
    | 'mat-stroked-button'
    | 'mat-icon-button'
    | 'mat-fab'
    | 'mat-icon'
    | 'mat-icon2'
    | 'mat-mini-fab'
    | 'mat-icon-custom' = 'mat-button';

  @Input() icon?: string;
  @Input() type?: string;
  @Input() iconPosition: 'start' | 'end' = 'start';

  @Output() btnClick = new EventEmitter<void>();
}
