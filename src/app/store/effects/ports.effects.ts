import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { merge, Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import {
  PortsActionTypes,
  AsyncGet,
  AsyncGetSuccess,
  AsyncGetError,
  PortActions
} from '../actions/ports.actions';
import { Port, PortQueryParams } from '../models/port.model';

@Injectable()
export class PortsEffects {
  constructor(private actions$: Actions, private harborService: ApiService) {}

  //   @Effect()
  //   asyncGet$: Observable<Port[] | Action> = this.actions$.pipe(
  //     ofType(PortsActionTypes.ASYNC_GET),
  //     mergeMap((action) =>
  //       this.harborService
  //         .getHarbors(action)
  //         .pipe(map((ports) => ({ type: AsyncGetSuccess, payload: ports })))
  //     )

  //     // switchMap(() =>
  //     //   of(1).pipe(
  //     //     delay(1500),
  //     //     switchMap((a: any) => {
  //     //       return of(new AsyncIncrementSuccess(1));
  //     //     })
  //     //   )
  //     // )
  //   );
  @Effect()
  asyncGet$ = this.actions$.pipe(
    ofType(PortsActionTypes.ASYNC_GET),
    mergeMap((action) =>
      this.harborService
        .getHarbors(action)
        .pipe(map((ports) => ({ type: AsyncGetSuccess, payload: ports })))
    )

    // switchMap(() =>
    //   of(1).pipe(
    //     delay(1500),
    //     switchMap((a: any) => {
    //       return of(new AsyncIncrementSuccess(1));
    //     })
    //   )
    // )
  );
}
