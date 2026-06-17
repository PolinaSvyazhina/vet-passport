import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TuiChevron,
  TuiDataListWrapperComponent,
  TuiInputDateDirective,
  TuiInputPhoneInternational,
  TuiSelectDirective
} from '@taiga-ui/kit';
import { TuiButton, TuiButtonX, TuiCalendar, TuiInput } from '@taiga-ui/core';
import { TuiForm } from '@taiga-ui/layout';
import { TuiDay } from '@taiga-ui/cdk';
import { DrugList, IEvent } from '../../interfaces/event.interface';
import { BaseEventService } from '../../services/base-event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    TuiButton,
  ],
  templateUrl: 'event-create.page.html',
  styleUrls: ['event-create.scss'],
  providers: []
})
export class EventCreatePage implements OnInit {

  protected nameVaccineValue = new FormControl('', Validators.required);
  protected typeDrug = new FormControl<DrugList>({ type: 'ticks', name: 'От клещей' }, Validators.required);
  protected dateAdmissionValue = new FormControl<TuiDay | null>( null, Validators.required);

  protected form = new FormGroup({
    nameVaccineValue: this.nameVaccineValue,
    dateAdmissionValue: this.dateAdmissionValue,
    typeDrug: this.typeDrug
  })
  private _datesEventsServices: BaseEventService = inject(BaseEventService);

  private _router: Router = inject(Router);

  protected readonly typeDrugList: DrugList[] = [
    { type: 'ticks', name: 'От клещей' },
    { type: 'vaccine', name: 'Вакцины' },
    { type: 'parasite', name: 'Дегельминтизация' },
  ];

  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._activatedRoute.queryParams
      .pipe(
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe(params => {;
        this.mapDefaultDateAdmissionValue(params['drugType'])
      })
  }

  protected clear(): void {
    this.nameVaccineValue.reset();
  }

  protected typeStringify(x: DrugList) {
    return x.name;
  }

  protected submitForm(): void {
    if (this.form.valid) {
      const event: IEvent = {
        id: crypto.randomUUID(),
        drug: this.typeDrug.value!,
        nameVaccine: this.nameVaccineValue.value!,
        dateAdmission: this.dateAdmissionValue.value!,
      };
      this._datesEventsServices.addEvent(event)

      this._router.navigate(['cabinet'])
    }
  }

  private mapDefaultDateAdmissionValue(drag: string): void {
    if (drag === 'ticks') {
      this.typeDrug.setValue(this.typeDrugList[0]);
    }

    if (drag === 'vaccine') {
      this.typeDrug.setValue(this.typeDrugList[1]);
    }

    if (drag === 'parasite') {
      this.typeDrug.setValue(this.typeDrugList[2]);
    }
  }
}

