import { Routes } from '@angular/router';
import { CABINET_ROUTES } from './children/cabinet/pages/cabinet-page/cabinet.page.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cabinet',
    pathMatch: 'full',
  },
  {
    path: 'cabinet',
    children: CABINET_ROUTES
  },
];
