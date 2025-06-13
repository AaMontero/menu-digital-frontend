import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'contenedor-generico-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contenedor-generic.component.html',
  styleUrls: ['./contenedor-generic.component.css'],
})
export class ContenedorGComponent {
  @Input() customClass: string = '';
  ngOnInit(): void {
    
  }
}
