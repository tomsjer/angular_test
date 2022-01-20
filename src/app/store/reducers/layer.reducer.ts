import { createSelector } from '@ngrx/store';
import { AppState } from '.';
import { LayerState } from '../models/layer.model';
import { PortType } from '../models/port.model';
import {
  LayerActions,
  LayerActionTypes,
  ToggleActive
} from '../actions/layer.actions';

const initialState: LayerState = {
  layers: [
    {
      type: PortType.PORT,
      icon: '/assets/icons/cruise.png',
      name: 'Ports',
      active: true
    },
    {
      type: PortType.CRUISE,
      icon: '/assets/icons/port.png',
      name: 'Cruises',
      active: true
    }
  ]
};

export function reducer(
  state: LayerState = initialState,
  action: LayerActions
) {
  switch (action.type) {
    case LayerActionTypes.TOGGLE_ACTIVE:
      const i = state.layers.findIndex(
        (layer) => layer.type === action.payload
      );
      const layers = state.layers.slice();
      layers[i] = {
        ...layers[i],
        active: !layers[i].active
      };

      return {
        ...state,
        layers
      };

    default:
      return state;
  }
}

export const selectFeature = (state: AppState) => state.layers;

export const getLayers = createSelector(
  selectFeature,
  (state: LayerState) => state.layers
);

// export const getLoading = createSelector(
//   selectFeature,
//   (state: PortsState) => state.loading
// );
