import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PortMapComponent } from './components/port-map/port-map.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes), HttpClientModule],
      declarations: [
        AppComponent,
        HomeComponent,
        PortMapComponent,
        PageNotFoundComponent
      ],
      providers: [ApiService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
