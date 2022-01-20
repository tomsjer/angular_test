import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PortMapComponent } from './components/port-map/port-map.component';
import { PortsListComponent } from './components/ports-list/ports-list.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home ' } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'counter',
    loadChildren: 'src/app/modules/counter/counter.module#CounterModule'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    PortMapComponent,
    PortsListComponent,
    SideBarComponent
  ]
})
export class AppRoutingModule {}
