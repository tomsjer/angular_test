import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Layer } from '../../store/models/layer.model';
import { Port } from '../../store/models/port.model';

@Component({
  selector: 'app-ports-list',
  templateUrl: './ports-list.component.html',
  styleUrls: ['./ports-list.component.scss']
})
export class PortsListComponent {
  @Input('layers') layers: Layer[] = [];
  @Input('ports') ports: Port[] = [];
  @Input('selectedPort') selectedPort: Port = null;
  @Input('id') id: string = '';
  @Output('onChange') onChange = new EventEmitter<{ boolean; string }>();
  @Output('onClick') onClick = new EventEmitter<{ string }>();

  constructor() {}

  public getIconByType(type) {
    return this.layers.find((l) => l.type === type).material_icon;
  }

  public selected(id) {
    return this.selectedPort && this.selectedPort.id === id;
  }

  public hasId() {
    return this.id !== '/';
  }
}
