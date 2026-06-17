import {
  TuiButton,
  TuiDataListComponent,
  TuiDropdown,
  TuiIcon,
  TuiOption,
  TuiRoot,
} from '@taiga-ui/core';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiHeaderComponent } from '@taiga-ui/layout';
import { BaseEventService } from '../cabinet/services/base-event.service';
import { EventLocalStorageService } from '../cabinet/services/event-local-storage.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TuiHeaderComponent,
    TuiAvatar,
    TuiDropdown,
    TuiDataListComponent,
    TuiOption,
    RouterLink,
    TuiButton,
    TuiRoot,
    TuiIcon,
      TuiRoot
],
  providers: [{ provide: BaseEventService, useClass: EventLocalStorageService }],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private _router: Router = inject(Router);

  public goCreationEventPage(drugType: string): void {
    this._router.navigate(['/cabinet/event-create'], {
      queryParams: { drugType },
    });
  }
}
