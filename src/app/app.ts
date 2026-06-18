import {
  TuiRoot,
} from '@taiga-ui/core';
import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { BaseEventService } from './children/cabinet/services/base-event.service';
import { EventLocalStorageService } from './children/cabinet/services/event-local-storage.service';
import { HeaderDropdownComponent } from './components/header-dropdown/header-dropdown.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TuiRoot,
    HeaderDropdownComponent,
  ],
  providers: [{ provide: BaseEventService, useClass: EventLocalStorageService }],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
