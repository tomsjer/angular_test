import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getId } from 'src/app/store/reducers';
import * as fromRouter from '@ngrx/router-store';
import { getLayers } from 'src/app/store/reducers/layer.reducer';
import {
  getPorts,
  getSelectedPort
} from 'src/app/store/reducers/ports.reducer';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  layers$: Observable<any>;
  ports$: Observable<any>;
  selectedPort$: Observable<any>;
  router$: Observable<any>;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 2, rows: 1 }
      ];
    })
  );
  constructor(
    private store: Store<AppState>,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.layers$ = this.store.select(getLayers);
    this.ports$ = this.store.select(getPorts);
    this.selectedPort$ = this.store.select(getSelectedPort);
    this.router$ = this.store.select(getId);
  }
}
