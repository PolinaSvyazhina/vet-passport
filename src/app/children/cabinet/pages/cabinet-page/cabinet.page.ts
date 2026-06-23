import { Component, inject, OnInit } from '@angular/core';
import { BaseEventService } from '../../services/base-event.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TableComponent } from '../../../../components/table/table.component';

@Component({
  templateUrl: 'cabinet.page.html',
  selector: 'cabinet-page',
  styleUrls: ['cabinet.page.scss'],

  imports: [TableComponent],
})
export class CabinetPage implements OnInit {
  private _datesEventsServices: BaseEventService = inject(BaseEventService);
  protected getEventList = toSignal(this._datesEventsServices.eventList$);

  public ngOnInit(): void {}
}
