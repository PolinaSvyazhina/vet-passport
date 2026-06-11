import { CabinetPage } from './cabinet.page';
import { Routes } from '@angular/router';

export const CABINET_ROUTES : Routes = [
  {
    path: '',
    component: CabinetPage,
    children: [

    ]
  }
]
