import { createSelector } from '@ngrx/store';
import { Port } from '../models/port.model';
import { PortsActionTypes, PortActions } from '../actions/ports.actions';
import { PortsState } from '../models/port.model';
import { AppState } from '.';
import { Actions } from '@ngrx/effects';

const initialState: PortsState = {
  ports: [],
  loading: false,
  selectedPort: null,
  latLng: [-41.0779028571996, -68.35809230804445],
  zoom: 7
};

export function reducer(state: PortsState = initialState, action: PortActions) {
  switch (action.type) {
    case PortsActionTypes.ASYNC_GET:
      return {
        ...state,
        loading: true,
        latLng: action.payload.latLng,
        zoom: action.payload.zoom
      };

    case PortsActionTypes.ASYNC_GET_SUCCESS:
      return { ...state, loading: false, ports: action.payload };

    case PortsActionTypes.ASYNC_GET_ERROR:
      return { ...state, loading: false };

    case PortsActionTypes.SELECT_PORT:
      return {
        ...state,
        selectedPort: state.ports.find((port) => port.id === action.payload)
      };

    case PortsActionTypes.CLEAR_SELECTION:
      return { ...state, selectedPort: null };

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

export const getSelectedPort = createSelector(
  selectFeature,
  (state: PortsState) => state.selectedPort
);

export const getInitMapProps = createSelector(
  selectFeature,
  (state: PortsState) => ({ latLng: state.latLng, zoom: state.zoom })
);
