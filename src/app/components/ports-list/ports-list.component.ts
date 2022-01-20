import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Layer } from '../../store/models/layer.model';
import { Port } from '../../store/models/port.model';

@Component({
  selector: 'app-ports-list',
  templateUrl: './ports-list.component.html',
  styleUrls: ['./ports-list.component.css']
})
export class PortsListComponent {
  @Input('layers') layers: Layer[] = [];
  @Input('ports') ports: Port[] = [];
  @Input('selectedPort') selectedPort: Port = null;
  @Output('onChange') onChange = new EventEmitter<{ boolean; string }>();
  @Output('onClick') onClick = new EventEmitter<{ string }>();

  constructor() {}
}
