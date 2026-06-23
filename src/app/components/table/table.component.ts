import { Component, input, InputSignal } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiTable } from '@taiga-ui/addon-table';
import { IEvent } from '../../children/cabinet/interfaces/event.interface';

@Component({
  selector: 'table-component',
  templateUrl: 'table.component.html',
  styleUrls: ['table.scss'],
  imports: [
    TuiTable
  ],
})

export class TableComponent {
  public list: InputSignal<IEvent[] | undefined> = input.required();

  constructor() {
    console.log('TableComponent constructor');
    console.log(this.list);
  }

  public getNextDateTake(lastDate: TuiDay, nextAppointmentDate: string): TuiDay {
    const daysToAdd = Number(nextAppointmentDate);
    const jsDate = lastDate.toLocalNativeDate();
    jsDate.setDate(jsDate.getDate() + daysToAdd);

    return TuiDay.fromLocalNativeDate(jsDate) ?? '';
  }
}
