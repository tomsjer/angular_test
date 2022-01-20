import { Action } from '@ngrx/store';

export enum CounterActionTypes {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  ASYNC_INCREMENT = 'ASYNC_INCREMENT',
  ASYNC_INCREMENT_SUCCESS = 'ASYNC_INCREMENT_SUCCESS',
  RESET = 'RESET'
}

export class Increment implements Action {
  readonly type = CounterActionTypes.INCREMENT;
  constructor(public payload?: number) {}
}

export class Decrement implements Action {
  readonly type = CounterActionTypes.DECREMENT;
  constructor(public payload?: number) {}
}

export class AsyncIncrement implements Action {
  readonly type = CounterActionTypes.ASYNC_INCREMENT;
}

export class AsyncIncrementSuccess implements Action {
  readonly type = CounterActionTypes.ASYNC_INCREMENT_SUCCESS;
  constructor(public payload: number) {}
}

export class Reset implements Action {
  readonly type = CounterActionTypes.RESET;
}

export type CounterActions =
  | Increment
  | Decrement
  | AsyncIncrement
  | AsyncIncrementSuccess
  | Reset;
