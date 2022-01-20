import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  getCount,
  getIncrementing,
  Increment,
  Decrement,
  Reset,
  AsyncIncrement
} from '../../store';
import { AppState } from '../../store/reducers/counter.reducer';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  count$: Observable<number>;
  incrementing$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.count$ = store.pipe(select(getCount));
    this.incrementing$ = store.pipe(select(getIncrementing));
  }

  increment() {
    this.store.dispatch(new Increment());
  }

  asyncIncrement() {
    this.store.dispatch(new AsyncIncrement());
  }

  decrement() {
    this.store.dispatch(new Decrement());
  }

  reset() {
    this.store.dispatch(new Reset());
  }
}
