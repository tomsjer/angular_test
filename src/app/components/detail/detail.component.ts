import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import L from 'leaflet';
import { Store } from '@ngrx/store';
import { AppState, getId } from 'src/app/store/reducers';
import { getLayers } from 'src/app/store/reducers/layer.reducer';
import { Layer } from 'src/app/store/models/layer.model';
import {
  getInitMapProps,
  getPorts,
  getSelectedPort
} from 'src/app/store/reducers/ports.reducer';
import { MapService } from 'src/app/services/map.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SelectPort } from 'src/app/store/actions/ports.actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {
  id: string = '';
  name: string = '';
  website: string = '';
  type: string = '';
  city: string = '';
  lat: string = '';
  lon: string = '';

  _map: any;
  _latLng: any;
  _zoom: any;

  //FIXME: this should be handled by MapService
  _icon: any;
  _marker: any;
  _iconsLayersMap: any = {
    cruise: '/assets/icons/port.png',
    port: '/assets/icons/cruise.png'
  };
  _markerLayer: any;

  _subs: Subscription[] = [];

  layers$ = this.store.select(getLayers);
  ports$ = this.store.select(getPorts);
  selectedPort$ = this.store.select(getSelectedPort);
  id$ = this.store.select(getId);
  initMapProps$ = this.store.select(getInitMapProps);

  @ViewChild('mapRef') mapRef: ElementRef;

  constructor(
    private store: Store<AppState>,
    private mapService: MapService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._subs.push(
      this.initMapProps$.subscribe((props) => {
        if (!props) return;
        this._latLng = props.latLng;
        this._zoom = props.zoom;
      })
    );
    // FIXME: template is not reflecting store state even with async pipe
    this._subs.push(
      this.selectedPort$.subscribe((port) => {
        if (!port) {
          this.router.navigate(['']);
          return;
        }
        if (this.id !== port.id) {
          this.router.navigate([port.id]);
          // FXME: include changeDetectorRef to avoid this hack
          setTimeout(() => {
            this.id = port.id;
            this.name = port.name;
            this.website = port.website;
            this.type = port.type;
            this.city = port.city;
            this.lat = port.latitude.toFixed(2);
            this.lon = port.longitude.toFixed(2);
            this._latLng = [port.latitude, port.longitude];
            this._icon = this.createIcon(this._iconsLayersMap[port.type]);
            this._marker = this.createMarker(
              port.latitude,
              port.longitude,
              this._icon
            );
            if (this._map) {
              this._markerLayer.clearLayers();
              this._markerLayer.addLayer(this._marker);
              this._map.setView(this._latLng);
            }
          });
        }
      })
    );

    this._subs.push(
      this.id$.subscribe((res) => {
        // If we are changing state with the router/history api
        const id = res.slice(1, res.length);
        if (this.id && id !== this.id) {
          this.id = id;
          this.store.dispatch(new SelectPort(id));
        }
      })
    );
  }
  ngAfterViewInit() {
    const element = this.mapRef.nativeElement;

    // Initialize the Leaflet map
    this._map = this.mapService.createMap(element, this._latLng, this._zoom);

    this._markerLayer = new L.LayerGroup();

    this._map.addLayer(this._markerLayer);

    // Add the basemap tile layer
    this.mapService.createTileLayer(this._map);
  }
  ngOnDestroy(): void {
    this._subs.forEach((s) => s.unsubscribe());
  }
  createMarker(latitude, longitude, icon) {
    return L.marker([latitude, longitude], {
      icon: icon
    });
  }
  createIcon(icon) {
    return L.icon({
      iconUrl: icon,
      iconSize: [25, 25],
      iconAnchor: [25, 25],
      popupAnchor: [0, -25]
    });
  }
}
