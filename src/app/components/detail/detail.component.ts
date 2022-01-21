import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getId } from 'src/app/store/reducers';
import * as fromRouter from '@ngrx/router-store';
import { getLayers } from 'src/app/store/reducers/layer.reducer';
import {
  getPorts,
  getSelectedPort
} from 'src/app/store/reducers/ports.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  layers$ = this.store.select(getLayers);
  ports$ = this.store.select(getPorts);
  selectedPort$ = this.store.select(getSelectedPort);
  router$ = this.store.select(getId);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}
}
