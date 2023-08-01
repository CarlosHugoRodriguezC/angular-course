import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;
  public currentCenter: LngLat = new LngLat(
    -101.18673481832406,
    19.693418005966336
  );

  public zoomLevel: number = 10;

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('divMap is not defined');

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
    });
    this._mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.off('zoom', () => {});
    this.map?.off('zoomend', () => {});
    this.map?.off('move', () => {});
  }

  private _mapListeners(): void {
    if (!this.map) throw new Error('map is not defined');

    this.map.on('zoom', (ev) => {
      this.zoomLevel = this.map?.getZoom() || 0;
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return;
      this.map?.zoomTo(18);
    });

    this.map.on('move', (ev) => {
      this.currentCenter = this.map!.getCenter();
    });
  }

  public zoomIn(): void {
    this.map?.zoomIn();
  }

  public zoomOut(): void {
    this.map?.zoomOut();
  }
  zoomTo(value: string) {
    this.map?.zoomTo(Number(value));
  }
}
