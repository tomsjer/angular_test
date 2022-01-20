import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, delay, tap } from 'rxjs/operators';
import {
  CounterActionTypes,
  AsyncIncrement,
  Increment,
  AsyncIncrementSuccess
} from '../actions';

@Injectable()
export class CounterEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  asyncIncrement$: Observable<number | Action> = this.actions$.pipe(
    ofType(CounterActionTypes.ASYNC_INCREMENT),
    switchMap(() =>
      of(1).pipe(
        delay(1500),
        switchMap((a: any) => {
          return of(new AsyncIncrementSuccess(1));
        })
      )
    )
  );
}
