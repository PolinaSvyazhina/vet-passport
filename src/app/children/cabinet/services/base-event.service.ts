import { IEvent } from '../interfaces/event.interface';
import { Observable } from 'rxjs';

export abstract class BaseEventService {
  public abstract eventList$: Observable<IEvent[]>;
  public abstract addEvent(event: IEvent): void;
  public abstract removeEvent(event: IEvent): void;
  public abstract editEvent(event: IEvent): void;
  public abstract getEventList(): IEvent[];
}
