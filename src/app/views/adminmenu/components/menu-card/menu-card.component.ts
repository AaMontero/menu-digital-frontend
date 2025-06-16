import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent {
  @Input() icon: string = '🍽️';
  @Input() title: string = 'Título del menú';
  @Input() description: string = 'Descripción breve del menú';
}
