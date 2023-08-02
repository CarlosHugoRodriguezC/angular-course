import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [],
})
export class MiniMapComponent implements AfterViewInit {
  @ViewChild('minimap') divMap!: ElementRef;
  @Input() lngLat?: [number, number] = [0, 0];
  public currentCenter?: LngLat;

  public map?: Map;

  constructor() {}

  ngAfterViewInit(): void {
    this.initCenter();
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.currentCenter,
      zoom: 15,
      interactive: false,
    });

    new Marker().setLngLat(this.currentCenter!).addTo(this.map);
  }

  initCenter() {
    if (!this.lngLat) {
      this.currentCenter = new LngLat(-101.18673481832406, 19.693418005966336);
    }

    this.currentCenter = new LngLat(this.lngLat![0], this.lngLat![1]);
  }
}
