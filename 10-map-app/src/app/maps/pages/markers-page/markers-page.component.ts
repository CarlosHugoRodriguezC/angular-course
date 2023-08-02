import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  center: LngLat;
}
@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map')
  public divMap?: ElementRef;
  public map?: Map;
  public currentCenter: LngLat = new LngLat(
    -101.18673481832406,
    19.693418005966336
  );

  public markers: MarkerColor[] = [];

  public zoomLevel: number = 13;

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('divMap is not defined');

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
    });

    this.readFromLocalStorage();

    // const markerHTML = document.createElement('div');
    // markerHTML.innerHTML = 'Hola Mundo';

    // const marker = new Marker({
    //   // color: 'blue',
    //   element: markerHTML,
    // })
    //   .setLngLat(this.currentCenter)
    //   .addTo(this.map);
  }

  createMarker(): void {
    if (!this.map) throw new Error('Map is not defined');
    const color: string = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const lngLat: LngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  public addMarker(lngLat: LngLat, color: string): void {
    if (!this.map) throw new Error('Map is not defined');

    const marker = new Marker({ color, draggable: true })
      .setLngLat(lngLat)
      .addTo(this.map)
      .on('dragend', (ev) => {
        this.saveToLocalStorage();
      });

    this.markers.push({ color, marker });
    this.saveToLocalStorage();
  }

  public goMarker(marker: Marker): void {
    if (!this.map) throw new Error('Map is not defined');
    this.map.flyTo({
      center: marker.getLngLat(),
      zoom: 14,
    });
  }

  public removeMarker(index: number): void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  private saveToLocalStorage(): void {
    const markers: PlainMarker[] = this.markers.map(({ color, marker }) => ({
      color,
      center: marker.getLngLat(),
    }));

    localStorage.setItem('markers', JSON.stringify(markers));
  }

  private readFromLocalStorage(): void {
    if (!localStorage.getItem('markers')) return;

    const markers: PlainMarker[] = JSON.parse(localStorage.getItem('markers')!);

    markers.forEach(({ color, center }: PlainMarker) => {
      this.addMarker(center, color);
    });
  }
}
