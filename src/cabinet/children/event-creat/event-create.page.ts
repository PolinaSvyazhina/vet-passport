import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  TuiChevron,
  TuiDataListWrapperComponent,
  TuiInputDateDirective,
  TuiInputPhoneInternational,
  TuiSelectDirective
} from '@taiga-ui/kit';
import { TuiButtonX, TuiCalendar, TuiInput } from '@taiga-ui/core';
import { TuiForm } from '@taiga-ui/layout';

@Component({
  imports: [
    ReactiveFormsModule,
    TuiInputPhoneInternational,
    TuiInput,
    TuiButtonX,
    TuiSelectDirective,
    TuiChevron,
    TuiDataListWrapperComponent,
    TuiForm,
    TuiInputDateDirective,
    TuiCalendar,
  ],
  templateUrl: 'event-create.page.html',
  styleUrls: ['event-create.scss'],
})
export class EventCreatePage {
  protected nameValue = new FormControl('');
  protected typeDrug = new FormControl({ type: 'ticks', name: 'От клещей' });
  protected dateValue = new FormControl();

  protected readonly typeDrugList = [
    { type: 'ticks', name: 'От клещей' },
    { type: 'vaccine', name: 'Вакцины' },
    { type: 'parasite', name: 'Дегельминтизация' },
  ];

  protected clear(): void {
    this.nameValue.reset();
  }

  protected typeStringify(x: DrugList) {
    return x.name;
  }
}

type DrugList = { type: 'ticks' | 'vaccine' | 'parasite', name: string };
