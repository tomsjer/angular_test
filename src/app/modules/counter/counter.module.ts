import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CounterRoutingModule } from './counter-routing.module';
import { counterReducer, CounterEffects } from './store';
import { CounterComponent } from './components/counter/counter.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CounterRoutingModule,
    StoreModule.forFeature('counter', counterReducer),
    EffectsModule.forFeature([CounterEffects])
  ],
  declarations: [CounterComponent]
})
export class CounterModule {}
