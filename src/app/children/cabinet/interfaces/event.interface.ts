import { TuiDay } from '@taiga-ui/cdk';

export interface IEvent {
  id: string,
  drug: DrugList,
  nameVaccine: string,
  dateAdmission: TuiDay,
  howManyTimesTake: string
}

export type DrugList = { type: 'ticks' | 'vaccine' | 'parasite', name: string };
