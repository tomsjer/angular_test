import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { merge, Observable, of } from 'rxjs';
import { map, switchMap, catchError, exhaustMap } from 'rxjs/operators';
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

  @Effect()
  asyncGet$ = this.actions$.pipe(
    ofType(PortsActionTypes.ASYNC_GET),
    switchMap((action: PortActions) =>
      this.harborService
        .getHarbors(action.payload)
        .pipe(map((ports) => new AsyncGetSuccess(ports)))
    )
  );
}
