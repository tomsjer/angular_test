import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DetailComponent } from './components/detail/detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortMapComponent } from './components/port-map/port-map.component';
import { PortsListComponent } from './components/ports-list/ports-list.component';
import { CustomMaterialModule } from './modules/material/custom-material.module';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home ' } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: ':id', component: DetailComponent },
  {
    path: 'counter',
    loadChildren: 'src/app/modules/counter/counter.module#CounterModule'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    PortMapComponent,
    PortsListComponent,
    DetailComponent
  ]
})
export class AppRoutingModule {}
