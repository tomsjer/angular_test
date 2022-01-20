import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToggleActive } from 'src/app/store/actions/layer.actions';
import { SelectPort } from 'src/app/store/actions/ports.actions';
import { AppState } from 'src/app/store/reducers';
import { getLayers } from 'src/app/store/reducers/layer.reducer';
import {
  getPorts,
  getSelectedPort
} from 'src/app/store/reducers/ports.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  layers$ = this.store.select(getLayers);
  ports$ = this.store.select(getPorts);
  selectedPort$ = this.store.select(getSelectedPort);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  // public isSelected(id: string):boolean {
  //   return this.selectedPort$.
  // }
}
