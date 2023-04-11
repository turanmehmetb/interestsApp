import { Routes } from '@angular/router'
import { MainComponent } from './components/main/main.component'
import { SelectionComponent } from './components/selection/selection.component'
import { PopularityComponent } from './components/popularity/popularity.component'

export const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
  },

  {
    path: 'selection',
    component: SelectionComponent,
  },

  {
    path: 'popularity',
    component: PopularityComponent,
  },

  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
]
