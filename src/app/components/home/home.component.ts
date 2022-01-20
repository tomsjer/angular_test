import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToggleActive } from 'src/app/store/actions/layer.actions';
import { AppState } from 'src/app/store/reducers';
import { getLayers } from 'src/app/store/reducers/layer.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  layers$ = this.store.select(getLayers);
  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  onChange(e, type) {
    this.store.dispatch(new ToggleActive(type));
  }
}
