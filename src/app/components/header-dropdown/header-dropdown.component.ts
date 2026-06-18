import { Component, inject } from '@angular/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiButton, TuiDataListComponent, TuiDropdown, TuiIcon, TuiOption } from '@taiga-ui/core';
import { TuiHeaderComponent } from '@taiga-ui/layout';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-dropdown',
  templateUrl: './header-dropdown.component.html',
  imports: [
    TuiHeaderComponent,
    TuiAvatar,
    TuiDropdown,
    TuiDataListComponent,
    TuiOption,
    RouterLink,
    TuiButton,
    TuiIcon,
  ],
  styleUrls: ['./header-dropdown.scss'],
})
export class HeaderDropdownComponent {
  private _router: Router = inject(Router);

  public goCreationEventPage(drugType: string): void {
    this._router.navigate(['/cabinet/event-create'], {
      queryParams: { drugType },
    });
  }
}
