import { CabinetPage } from './cabinet.page';
import { Routes } from '@angular/router';
import { EventListInformationPage } from '../../children/event-list-information/event-list-information.page';
import { EventCreatePage } from '../../children/event-creat/event-create.page';

export const CABINET_ROUTES : Routes = [
  {
    path: '',
    component: CabinetPage,
    children: [

    ]
  },
  {
    path: 'event-list',
    component: EventListInformationPage
  },
  {
    path: 'event-create',
    component: EventCreatePage
  }
]
