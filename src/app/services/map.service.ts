import { Injectable } from '@angular/core';
import L from 'leaflet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor() {}

  createMap(element, START_LATLNG, START_ZOOM) {
    return L.map(element, { trackResize: true, minZoom: 4 }).setView(
      START_LATLNG,
      START_ZOOM
    );
  }

  createTileLayer(map) {
    L.tileLayer(environment.L_TileLayer, {
      attribution: environment.L_Attribution,
      maxZoom: 18,
      id: environment.L_Id,
      accessToken: environment.L_AccessToken
    }).addTo(map);
  }
}
