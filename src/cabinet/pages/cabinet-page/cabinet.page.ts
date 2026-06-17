import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { BaseEventService } from '../../services/base-event.service';
import { IEvent } from '../../interfaces/event.interface';
import {TuiTable} from '@taiga-ui/addon-table';

@Component({
  templateUrl: 'cabinet.page.html',
  selector: 'cabinet-page',
  styleUrls: ['cabinet.page.scss'],
  imports: [
    TuiTable
  ],
})
export class CabinetPage implements OnInit {
  protected getEventList: WritableSignal<IEvent[]>= signal([])
  private _datesEventsServices: BaseEventService = inject(BaseEventService);


  public ngOnInit(): void {
    this.getEventList.set([...this.getEventList(), ...this._datesEventsServices.getEventList()])
  }
}
