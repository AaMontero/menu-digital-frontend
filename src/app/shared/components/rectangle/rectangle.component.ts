import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rectangulo-gris',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css'],
  imports: [CommonModule]
})
export class RectanguloGrisComponent {
  @Input() width: string = '200px';
  @Input() height: string = '100px';
  @Input() color: string = '#ccc';
}
