import {
  Component,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input
} from '@angular/core';
import L from 'leaflet';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import {
  getPorts,
  getLoading,
  getSelectedPort
} from '../../store/reducers/ports.reducer';
import {
  AsyncGet,
  ClearSelection,
  SelectPort
} from 'src/app/store/actions/ports.actions';
import { getLayers } from 'src/app/store/reducers/layer.reducer';
import { Layer } from 'src/app/store/models/layer.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-port-map',
  templateUrl: './port-map.component.html',
  styleUrls: ['./port-map.component.scss']
})
export class PortMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapRef') mapRef: ElementRef;
  @Input('layerDefs') layerDefs: Layer[] = [];
  _map: any;
  _iconsMap: any;
  _iconLayersMap: any;
  _markersMap: any = {};
  _requestId: any;
  _selectedId: string;

  private subs: Subscription[] = [];

  layers$ = this.store.select(getLayers);
  selectedPort$ = this.store.select(getSelectedPort);

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
    this._map = L.map(element, { trackResize: true, minZoom: 4 }).setView(
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
    this._iconsMap = this.layerDefs.reduce((acc, curr) => {
      acc[curr.type] = L.icon({
        iconUrl: curr.icon,
        iconSize: [25, 25],
        iconAnchor: [25, 25],
        popupAnchor: [0, -25]
      });
      return acc;
    }, {});

    this._iconLayersMap = this.layerDefs.reduce((acc, curr) => {
      acc[curr.type] = new L.LayerGroup();
      this._map.addLayer(acc[curr.type]);
      return acc;
    }, {});

    this.addMapListeners();
    this.addStoreListeners();

    this.loadLayerData(this._map.getBounds());
  }

  ngOnDestroy(): void {
    this.removeMapListeners();
    this.removeStoreListeners();
  }

  addStoreListeners() {
    this.subs.push(
      this.store
        .select(getPorts)
        .subscribe((harbors) => this.renderHarbors(harbors))
    );

    this.subs.push(
      this.selectedPort$.subscribe((selected) => {
        if (selected) {
          this._selectedId = selected.id;
          this._markersMap[this._selectedId].openPopup();
        } else {
          this._selectedId = null;
        }
      })
    );

    this.subs.push(
      this.layers$.subscribe((layers) => {
        this.layerDefs = layers;
        this.loadLayerData(this._map.getBounds());
      })
    );
  }

  removeStoreListeners() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  addMapListeners() {
    // Whenever the user pans, load data for the new bounds
    this._map.on('moveend', this.handleMovend.bind(this));
    this._map.on('popupclose', this.handlePopupClose.bind(this));
  }

  removeMapListeners() {
    this._map.off('moveend', this.handleMovend);
    this._map.off('popupclose', this.handlePopupClose);
  }

  handleMovend() {
    this.loadLayerData(this._map.getBounds());
  }

  handlePopupClose(e) {
    if (this._selectedId && this._selectedId === e.popup.options.id) {
      this.store.dispatch(new ClearSelection());
    }
  }

  loadLayerData(bounds) {
    this.layerDefs
      .filter((layer) => !layer.active)
      .forEach((layer) => this._iconLayersMap[layer.type].clearLayers());
    this.requestData(bounds);
  }

  requestData(bounds) {
    const activeLayers = this.layerDefs.filter((layer) => layer.active);
    this.store.dispatch(
      new AsyncGet({
        activeLayers,
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
    })
      .bindPopup(`<b>${harbor.name}</b><br>city: ${harbor.city}`, {
        id: harbor.id
      })
      .on('click', () => this.store.dispatch(new SelectPort(harbor.id)))
      .on('close', () => console.log('asdf'));
  }

  renderHarbors(harbors) {
    for (const harbor of harbors) {
      this._iconLayersMap[harbor.type].addLayer(
        (this._markersMap[harbor.id] = this.createMarker(
          harbor,
          this._iconsMap[harbor.type]
        ))
      );
    }
  }
}
