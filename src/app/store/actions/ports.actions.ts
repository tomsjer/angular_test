import { Action } from '@ngrx/store';
import { Port, PortQueryParams } from 'src/app/store/models/port.model';

export enum PortsActionTypes {
  ASYNC_GET = 'ASYNC_GET',
  ASYNC_GET_SUCCESS = 'ASYNC_GET_SUCCESS',
  ASYNC_GET_ERROR = 'ASYNC_GET_ERROR',
  SELECT_PORT = 'SELECT_PORT',
  CLEAR_SELECTION = 'CLEAR_SELECTION'
}

export class AsyncGet implements Action {
  readonly type = PortsActionTypes.ASYNC_GET;
  constructor(public payload?: any) {}
}

export class AsyncGetSuccess implements Action {
  readonly type = PortsActionTypes.ASYNC_GET_SUCCESS;
  constructor(public payload?: any) {}
}

export class AsyncGetError implements Action {
  readonly type = PortsActionTypes.ASYNC_GET_ERROR;
  constructor(public payload?: any) {}
}

export class SelectPort implements Action {
  readonly type = PortsActionTypes.SELECT_PORT;
  constructor(public payload?: any) {}
}
export class ClearSelection implements Action {
  readonly type = PortsActionTypes.CLEAR_SELECTION;
}

export type PortActions =
  | AsyncGet
  | AsyncGetSuccess
  | AsyncGetError
  | SelectPort
  | ClearSelection;
