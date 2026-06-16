import {
  TuiButton,
  TuiDataListComponent,
  TuiDropdown,
  TuiDropdownHover,
  TuiIcon,
  TuiOption,
  TuiRoot
} from '@taiga-ui/core';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiHeaderComponent } from '@taiga-ui/layout';

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
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private _router: Router = inject(Router);

  public goCreationEventPage(pageName: string): void {
    this._router.navigate(['/cabinet/event-create'], {
      queryParams: { pageName: pageName },
    });
  }
}
