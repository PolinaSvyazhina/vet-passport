import { Injectable } from '@angular/core';
import { IEvent } from '../interfaces/event.interface';
import { BaseEventService } from './base-event.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TuiDay } from '@taiga-ui/cdk';

@Injectable()
export class EventLocalStorageService extends BaseEventService {
  constructor() {
    super();
    console.log('EventLocalStorageService constructor');
    const eventList = (JSON.parse(localStorage.getItem('eventList') ?? '[]') as IEvent[]);

    eventList.forEach((a) => a.dateAdmission = TuiDay.jsonParse(a.dateAdmission as unknown as string))

    this._eventList$.next(eventList);
    this._eventList$
      .subscribe({
        next: event => localStorage.setItem('eventList', JSON.stringify(event))
      })
  }

  private _eventList$: BehaviorSubject<IEvent[]> = new BehaviorSubject<IEvent[]>([]);

  public get eventList$(): Observable<IEvent[]> {
    return this._eventList$
      .pipe(
        map((event: IEvent[]) => {
          return event.sort((a, b) => b.dateAdmission.toUtcNativeDate().getTime() - a.dateAdmission.toUtcNativeDate().getTime())
        })
      );
  }

  public override addEvent(event: IEvent) {
    this._eventList$.next([...this._eventList$.value, event]);
  }
  public override removeEvent(event: IEvent) {
    const newList: IEvent[] = this._eventList$.value.filter((i) => i.id !== event.id);
    this._eventList$.next(newList);
  }
  public override editEvent(event: IEvent) {
    const list: IEvent[] = this._eventList$.value;
    const oldEvent: number = list.findIndex(i => i.id === event.id);
    if (oldEvent) {
      list[oldEvent] = event;
      this._eventList$.next(list);
    }
  }
  public override getEventList(): IEvent[] {
    return [...this._eventList$.value];
  }
}
