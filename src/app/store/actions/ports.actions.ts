import { Action } from '@ngrx/store';
import { Port, PortQueryParams } from 'src/app/store/models/port.model';

export enum PortsActionTypes {
  ASYNC_GET = 'ASYNC_GET',
  ASYNC_GET_SUCCESS = 'ASYNC_GET_SUCCESS',
  ASYNC_GET_ERROR = 'ASYNC_GET_ERROR'
}

export class AsyncGet implements Action {
  readonly type = PortsActionTypes.ASYNC_GET;
  constructor(public payload?: PortQueryParams) {}
}

export class AsyncGetSuccess implements Action {
  readonly type = PortsActionTypes.ASYNC_GET_SUCCESS;
  constructor(public payload?: Port[]) {}
}

export class AsyncGetError implements Action {
  readonly type = PortsActionTypes.ASYNC_GET_ERROR;
  constructor(public payload?: any) {}
}

export type PortActions = AsyncGet | AsyncGetSuccess | AsyncGetError;
