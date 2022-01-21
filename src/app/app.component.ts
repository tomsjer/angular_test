import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncGet, SelectPort } from './store/actions/ports.actions';
import { AppState, getId } from './store/reducers';
import {
  getPorts,
  getLoading,
  getSelectedPort
} from './store/reducers/ports.reducer';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getLayers } from './store/reducers/layer.reducer';
import { ToggleActive } from './store/actions/layer.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Expero Shipping App';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  layers$ = this.store.select(getLayers);
  ports$ = this.store.select(getPorts);
  loading$ = this.store.select(getLoading);
  selectedPort$ = this.store.select(getSelectedPort);
  routerId$ = this.store.select(getId);

  constructor(
    private store: Store<AppState>,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {}

  onChange(type) {
    this.store.dispatch(new ToggleActive(type));
  }

  onClick(id) {
    this.store.dispatch(new SelectPort(id));
  }
}
