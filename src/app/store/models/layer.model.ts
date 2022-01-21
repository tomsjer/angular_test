import { PortType } from './port.model';

export interface Layer {
  type: PortType;
  icon: string;
  material_icon: string;
  name: string;
  active: boolean;
}

export type LayerState = {
  layers: Layer[];
};
