import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BaseEventService } from '../../services/base-event.service';
import { TableComponent } from '../../../../components/table/table.component';

@Component({
  imports: [TableComponent],
  templateUrl: 'event-list-information.page.html',
})
export class EventListInformationPage implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private drugType = signal('');
  private _destroyRef = inject(DestroyRef);
  private _datesEventsServices: BaseEventService = inject(BaseEventService);
  protected getEventList = toSignal(this._datesEventsServices.eventList$);
  protected filteredEventList = computed(() => {
    const list = this.getEventList() ?? [];
    const drug = this.drugType();

    return list.filter((event) => event.drug.type === drug);
  });

  ngOnInit(): void {
    this._activatedRoute.queryParams.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (params: Params) => {
        this.drugType.set(params['drugType']);
      },
    });
  }
}
