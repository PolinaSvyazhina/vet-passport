import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TuiChevron,
  TuiDataListWrapperComponent,
  TuiInputDateDirective,
  TuiInputPhoneInternational,
  TuiSelectDirective
} from '@taiga-ui/kit';
import { TuiButton, TuiButtonX, TuiCalendar, TuiCheckbox, TuiInput } from '@taiga-ui/core';
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
    TuiCheckbox,
  ],
  templateUrl: 'event-create.page.html',
  styleUrls: ['event-create.scss'],
  providers: [],
})
export class EventCreatePage implements OnInit {
  protected form = new FormGroup({
    nameVaccineValue: new FormControl('', Validators.required),
    dateAdmissionValue: new FormControl<TuiDay | null>(null, Validators.required),
    typeDrug: new FormControl<DrugList>({ type: 'ticks', name: 'От клещей' }, Validators.required),
    howManyTimesTake: new FormControl('', ),
    isShowControlHowMany: new FormControl(false, ),
  });
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
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((params) => {
        this.mapDefaultDateAdmissionValue(params['drugType']);
      });
  }

  protected clear(control: string): void {
    if (control === 'nameVaccineValue') {
      this.form.controls.nameVaccineValue.reset();
    } else {
      this.form.controls.howManyTimesTake.reset();
    }
  }

  protected typeStringify(x: DrugList) {
    return x.name;
  }

  protected submitForm(): void {
    if (this.form.valid) {
      const event: IEvent = {
        id: crypto.randomUUID(),
        drug: this.form.controls.typeDrug.value!,
        nameVaccine: this.form.controls.nameVaccineValue.value!,
        dateAdmission: this.form.controls.dateAdmissionValue.value!,
        howManyTimesTake: this.form.controls.howManyTimesTake.value!,
      };
      this._datesEventsServices.addEvent(event);

      this._router.navigate(['cabinet']);
    }
  }

  private mapDefaultDateAdmissionValue(drag: DrugList['type']): void {
    switch (drag) {
      case 'ticks':
        this.form.controls.typeDrug.setValue(this.typeDrugList[0]);
        break;
      case 'parasite':
        this.form.controls.typeDrug.setValue(this.typeDrugList[2]);
        break;
      case 'vaccine':
        this.form.controls.typeDrug.setValue(this.typeDrugList[1]);
    }
  }
}

