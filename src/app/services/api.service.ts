import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Port, PortQueryParams } from '../store/models/port.model';

const API_URL = `${environment.baseUrl}/api`;
const END_POINTS = {
  ports: '/ports'
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getHarbors(payload): Observable<Port[]> {
    const { portType, maxlat, minlat, minlon, maxlon } = payload;
    const url = `${API_URL}${END_POINTS['ports']}`;

    return this.httpClient
      .get(url, {
        params: {
          type: portType,
          maxlat,
          minlat,
          minlon,
          maxlon
        }
      })
      .pipe(
        map((data: { ports: Port[] }) => data.ports),
        catchError((err) => of(err))
      );
  }
}
