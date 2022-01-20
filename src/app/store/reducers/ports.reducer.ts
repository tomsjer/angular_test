import { createSelector } from '@ngrx/store';
import { Port } from '../models/port.model';
import { PortsActionTypes, PortActions } from '../actions/ports.actions';
import { PortsState } from '../models/port.model';
import { AppState } from '.';

const initialState: PortsState = {
  ports: [],
  loading: false,
  START_LATLNG: [28.913943, -94.131125],
  START_ZOOM: 7
};

export function reducer(state: PortsState = initialState, action: PortActions) {
  switch (action.type) {
    case PortsActionTypes.ASYNC_GET:
      return { ...state, loading: true };

    case PortsActionTypes.ASYNC_GET_SUCCESS:
      const ports = [
        ...state.ports.filter((port) => port.type !== action.payload.type),
        ...action.payload.ports
      ];
      return { ...state, loading: false, ports };

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
