import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { reducer as portsReducer } from './ports.reducer';
import { PortsState } from '../models/port.model';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
  router: fromRouter.RouterReducerState;
  ports: PortsState;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  ports: portsReducer
};

// console.log all actions
export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state: AppState, action: any): AppState {
    const newState = reducer(state, action);
    console.log('action', action, {
      prevState: state,
      newState
    });
    return newState;
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger, storeFreeze]
  : [storeFreeze]; // NOTE: should storeFreeze be available on prod?
