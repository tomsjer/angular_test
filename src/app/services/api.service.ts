import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
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

  /*
  from(pagesToFetch)
  .pipe(
    toArray(),
    mergeMap(pages => {
      const observables = pages.map(page => this.mockRemoteData(page));
      return forkJoin(observables);
    }),
  ) */

  public getHarbors(payload): Observable<Port[]> {
    const { activeLayers, maxlat, minlat, minlon, maxlon } = payload;
    const url = `${API_URL}${END_POINTS['ports']}`;
    return forkJoin(
      activeLayers.map((layer) =>
        this.httpClient
          .get(url, {
            params: {
              type: layer.type,
              maxlat,
              minlat,
              minlon,
              maxlon
            }
          })
          .pipe(
            map((data: { ports: Port[] }) => data.ports),
            catchError((err) => of(err))
          )
      )
    ).pipe(map((result: any) => result.flat()));
  }
}
