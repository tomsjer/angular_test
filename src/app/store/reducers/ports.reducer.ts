import { createSelector } from '@ngrx/store';
import { Port } from '../models/port.model';
import { PortsActionTypes, PortActions } from '../actions/ports.actions';
import { PortsState } from '../models/port.model';
import { AppState } from '.';

const initialState: PortsState = {
  ports: [],
  loading: false
};

export function reducer(state: PortsState = initialState, action: PortActions) {
  switch (action.type) {
    case PortsActionTypes.ASYNC_GET:
      return { ...state, loading: true };

    case PortsActionTypes.ASYNC_GET_SUCCESS:
      return { ...state, loading: false };

    case PortsActionTypes.ASYNC_GET_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
}

export const selectFeature = (state: AppState) => state.ports;

export const getPorts = createSelector(
  selectFeature,
  (state: PortsState) => state.ports
);

export const getLoading = createSelector(
  selectFeature,
  (state: PortsState) => state.loading
);