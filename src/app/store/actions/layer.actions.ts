import { Action } from '@ngrx/store';
import { PortType } from '../models/port.model';

export enum LayerActionTypes {
  TOGGLE_ACTIVE = 'TOGGLE_ACTIVE'
}

export class ToggleActive implements Action {
  readonly type = LayerActionTypes.TOGGLE_ACTIVE;
  constructor(public payload?: PortType) {}
}

export type LayerActions = ToggleActive;
