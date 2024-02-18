import { Injectable, computed, signal } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // Whit Signals
  private mapSignal = signal<Map | undefined>(undefined);

  public isMapReadyComputed = computed(() => {
    return !!this.mapSignal();
  });


  // No signals
  private map?: Map;

  get isMapReady(): boolean {
    return !!this.map;
  }

  setMap( map: Map ): void {
    this.map = map;
    this.mapSignal.set(map);
  }

  flyTo( coords: LngLatLike ) {
    if( !this.isMapReadyComputed()) throw Error("Map is not ready");

    this.mapSignal()?.flyTo({
      zoom: 14,
      center: coords
    });

    this.map?.flyTo({
      zoom:14,
      center: coords
    })
  }
}
