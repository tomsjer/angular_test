import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

const API_URL = 'http://localhost:3000/api';
const END_POINTS = {
  ports: '/ports'
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getHarbors(payload: any) {
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
        map((data: any) => data.ports),
        catchError((err) => of(err))
      );
  }
}
