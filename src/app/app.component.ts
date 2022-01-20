import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncGet } from './store/actions/ports.actions';
import { AppState } from './store/reducers';
import { getPorts, getLoading } from './store/reducers/ports.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dev-ui-test-angular';
  ports$ = this.store.select(getPorts);
  loading$ = this.store.select(getLoading);
  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.store.dispatch(new AsyncGet());
  }
}
