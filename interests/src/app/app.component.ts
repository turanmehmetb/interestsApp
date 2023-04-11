import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  menuItems: MenuItem []= [
    { label: 'Home', routerLink: '/', icon: 'pi pi-fw pi-home'},
    { label: 'Selection', routerLink: 'selection', icon: 'pi pi-fw pi-check'},
    { label: 'Popularity', routerLink: 'popularity', icon: 'pi pi-fw pi-star'}
  ];

}
