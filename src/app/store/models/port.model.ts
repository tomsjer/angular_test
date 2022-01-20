export enum PortType {
  PORT = 'port',
  HARBOR = 'cruise'
}

export interface Port {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  city: string;
  website: string;
  natlScale: number;
  type: PortType;
}

export interface PortQueryParams {
  type: string;
  portType: string;
  maxlat: string;
  minlat: string;
  minlon: string;
  maxlon: string;
}

export interface PortsState {
  ports: Port[];
  loading: boolean;
}
