declare module '@mapbox/mapbox-gl-geocoder' {
  import { IControl } from 'mapbox-gl';
  interface GeocoderOptions {
    accessToken: string;
    mapboxgl: any;
    useBrowserFocus?: boolean;
    [key: string]: any;
  }
  export default class MapboxGeocoder implements IControl {
    constructor(options: GeocoderOptions);
    onAdd(map: any): HTMLElement;
    onRemove(): void;
    getResult(): any;
    query(query: string): void;
    [key: string]: any;
  }
}