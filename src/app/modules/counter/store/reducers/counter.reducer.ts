import { createSelector } from '@ngrx/store';
import { CounterActions, CounterActionTypes } from '../actions';

export interface AppState {
  counter: CounterState;
}

export interface CounterState {
  count: number;
  incrementing: boolean;
}

const initialState: CounterState = {
  count: 0,
  incrementing: false
};

export function reducer(state: CounterState = initialState, action: CounterActions) {
  switch (action.type) {
    case CounterActionTypes.INCREMENT:
      return { ...state, count: state.count + 1 };

    case CounterActionTypes.DECREMENT:
      return { ...state, count: state.count - 1 };

    case CounterActionTypes.ASYNC_INCREMENT:
      return { ...state, incrementing: true };

    case CounterActionTypes.ASYNC_INCREMENT_SUCCESS:
      return { ...state, count: state.count + 1, incrementing: false };

    case CounterActionTypes.RESET:
      return initialState;

    default:
      return state;
  }
}

export const selectFeature = (state: AppState) => state.counter;

export const getCount = createSelector(
  selectFeature,
  (state: CounterState) => state.count
);

export const getIncrementing = createSelector(
  selectFeature,
  (state: CounterState) => state.incrementing
);
