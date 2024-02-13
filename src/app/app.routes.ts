import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'mainMap',
    loadComponent: () => import('@maps/map-screen.component')
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'mainMap'
  }
];
