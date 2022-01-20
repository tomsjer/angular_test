import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import L from 'leaflet';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { getPorts, getLoading } from '../../store/reducers/ports.reducer';
import { AsyncGet } from 'src/app/store/actions/ports.actions';
import { getLayers } from 'src/app/store/reducers/layer.reducer';

const LAYER_DEFS = [
  { type: 'port', icon: '/assets/icons/cruise.png', name: 'Ports' },
  { type: 'cruise', icon: '/assets/icons/port.png', name: 'Cruises' }
];

@Component({
  selector: 'app-port-map',
  templateUrl: './port-map.component.html',
  styleUrls: ['./port-map.component.scss']
})
export class PortMapComponent implements AfterViewInit {
  @ViewChild('mapRef') mapRef: ElementRef;

  _map: any;
  _icons: any;
  _iconLayers: any;
  _requestId: any;

  layers$ = this.store.select(getLayers);

  constructor(
    private elem: ElementRef,
    public apiService: ApiService,
    public store: Store<AppState>
  ) {}

  ngAfterViewInit() {
    const START_LATLNG = [28.913943, -94.131125];
    const START_ZOOM = 7;

    const element = this.mapRef.nativeElement;

    // Initialize the Leaflet map
    this._map = L.map(element, { trackResize: false }).setView(
      START_LATLNG,
      START_ZOOM
    );

    // Add the basemap tile layer
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
          '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' +
          ', Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/satellite-streets-v10/tiles/256',
        accessToken:
          'pk.eyJ1IjoiYnJhbmRvbmRldiIsImEiOiJjajFwNjNmODAwMDBnMzFwbDJ4N21yZmFmIn0.YC44JxjiM36-I54e-hVQUA'
      }
    ).addTo(this._map);

    // Add the port/cruise layers
    this._icons = LAYER_DEFS.map((def) =>
      L.icon({
        iconUrl: def.icon,
        iconSize: [25, 25],
        iconAnchor: [25, 25],
        popupAnchor: [0, -25]
      })
    );
    this._iconLayers = LAYER_DEFS.map((def) => new L.LayerGroup());
    this._iconLayers.forEach((l) => this._map.addLayer(l));

    // Whenever the user pans, load data for the new bounds
    this._map.on('moveend', () => this.loadLayerData(this._map.getBounds()));

    this.store.select(getPorts).subscribe((harbors) => {
      LAYER_DEFS.forEach((def, i) => {
        this.renderHarbors(harbors, this._icons[i], this._iconLayers[i]);
      });
    });

    this.loadLayerData(this._map.getBounds());
  }

  loadLayerData(bounds) {
    LAYER_DEFS.forEach((def, i) => {
      this.requestData(bounds, def);
    });
  }

  requestData(bounds, def) {
    this.store.dispatch(
      new AsyncGet({
        portType: def.type,
        minlat: bounds._southWest.lat,
        minlon: bounds._southWest.lng,
        maxlat: bounds._northEast.lat,
        maxlon: bounds._northEast.lng
      })
    );
  }

  createMarker(harbor, icon) {
    return L.marker([harbor.latitude, harbor.longitude], {
      icon: icon
    }).bindPopup(`<b>${harbor.name}</b><br>city: ${harbor.city}`);
  }

  renderHarbors(harbors, icon, layer) {
    layer.clearLayers();
    for (const harbor of harbors) {
      layer.addLayer(this.createMarker(harbor, icon));
    }
  }
}
