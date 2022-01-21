import {
  Component,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  ComponentFactoryResolver,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import L from 'leaflet';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import {
  getPorts,
  getLoading,
  getSelectedPort,
  getInitMapProps
} from '../../store/reducers/ports.reducer';
import {
  AsyncGet,
  ClearSelection,
  SelectPort
} from 'src/app/store/actions/ports.actions';
import { getLayers } from 'src/app/store/reducers/layer.reducer';
import { Layer } from 'src/app/store/models/layer.model';
import { Subscription } from 'rxjs';
import { PopupComponent } from '../popup/popup.component';
import { PopupDirective } from '../popup/popup.directive';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-port-map',
  templateUrl: './port-map.component.html',
  styleUrls: ['./port-map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PortMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapRef') mapRef: ElementRef;
  @ViewChild(PopupDirective) popupHost!: PopupDirective;
  @Input('layerDefs') layerDefs: Layer[] = [];
  @Input('initMapProps') initMapProps: any = {};
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
    public store: Store<AppState>,
    private resolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
    private mapService: MapService
  ) {}

  ngAfterViewInit() {
    const element = this.mapRef.nativeElement;

    // Initialize the Leaflet map
    this._map = this.mapService.createMap(
      element,
      this.initMapProps.latLng,
      this.initMapProps.zoom
    );

    // Add the basemap tile layer
    this.mapService.createTileLayer(this._map);

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
    this.loadLayerData();
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
          if (!this._markersMap[this._selectedId].isPopupOpen()) {
            this._markersMap[this._selectedId].fire('click');
          }
        } else {
          this._selectedId = null;
        }
      })
    );

    this.subs.push(
      this.layers$.subscribe((layers) => {
        this.layerDefs = layers;
        this.loadLayerData();
      })
    );
  }

  removeStoreListeners() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  addMapListeners() {
    // Whenever the user pans, load data for the new bounds
    this._map.on('moveend', this.loadLayerData.bind(this));
    this._map.on('popupclose', this.handlePopupClose.bind(this));
  }

  removeMapListeners() {
    this._map.off('moveend', this.loadLayerData);
    this._map.off('popupclose', this.handlePopupClose);
  }

  handlePopupClose(e) {
    if (this._selectedId && this._selectedId === e.popup.options.id) {
      this.store.dispatch(new ClearSelection());
    }
  }

  loadLayerData() {
    const bounds = this._map.getBounds();
    const center = this._map.getCenter();
    const zoom = this._map.getZoom();
    this.layerDefs
      .filter((layer) => !layer.active)
      .forEach((layer) => this._iconLayersMap[layer.type].clearLayers());
    this.requestData(bounds, [center.lat, center.lng], zoom);
  }

  requestData(bounds, latLng, zoom) {
    const activeLayers = this.layerDefs.filter((layer) => layer.active);
    this.store.dispatch(
      new AsyncGet({
        activeLayers,
        minlat: bounds._southWest.lat,
        minlon: bounds._southWest.lng,
        maxlat: bounds._northEast.lat,
        maxlon: bounds._northEast.lng,
        latLng,
        zoom
      })
    );
  }

  createMarker(harbor, icon) {
    const marker = L.marker([harbor.latitude, harbor.longitude], {
      icon: icon
    }).bindPopup(null, {
      id: harbor.id,
      className: 'custom-popup'
    });

    // On every marker click, we update the hidden angular material popup
    // in order to copy its html to the leaflet popup.
    marker.on('click', () => {
      if (this._selectedId !== harbor.id) {
        this.store.dispatch(new SelectPort(harbor.id));
      }
      this.renderCustomPopup(harbor, marker);
    });

    return marker;
  }

  renderCustomPopup(harbor, marker) {
    const viewContainerRef = this.popupHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(
      this.resolver.resolveComponentFactory(PopupComponent)
    );
    componentRef.instance.name = harbor.name;
    componentRef.instance.id = harbor.id;
    this.changeDetectorRef.detectChanges();

    marker.setPopupContent(componentRef.location.nativeElement);
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
