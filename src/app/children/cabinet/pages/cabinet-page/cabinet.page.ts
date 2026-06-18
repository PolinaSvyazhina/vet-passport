import { Component, inject, OnInit } from '@angular/core';
import { BaseEventService } from '../../services/base-event.service';
import {TuiTable} from '@taiga-ui/addon-table';
import { toSignal } from '@angular/core/rxjs-interop';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  templateUrl: 'cabinet.page.html',
  selector: 'cabinet-page',
  styleUrls: ['cabinet.page.scss'],
  imports: [
    TuiTable
  ],
})
export class CabinetPage implements OnInit {
  private _datesEventsServices: BaseEventService = inject(BaseEventService);
  protected getEventList = toSignal(this._datesEventsServices.eventList$)

  public ngOnInit(): void {}

  public getNextDateTake(lastDate: TuiDay, nextAppointmentDate: string): TuiDay {
    const daysToAdd = Number(nextAppointmentDate);
    const jsDate = lastDate.toLocalNativeDate();
    jsDate.setDate(jsDate.getDate() + daysToAdd);

    return TuiDay.fromLocalNativeDate(jsDate) ?? '';
  }
}
