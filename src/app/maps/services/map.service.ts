import { Injectable, computed, signal } from '@angular/core';
import { Feature } from '@maps/interfaces/places.interface';
import { LngLatLike, Map, Marker, Popup } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // Whit Signals
  private mapSignal = signal<Map | undefined>(undefined);
  private markers = signal<Marker[]>([]);

  public isMapReadyComputed = computed(() => {
    return !!this.mapSignal();
  });


  // No signals
  private map?: Map;

  get isMapReady(): boolean {
    return !!this.map;
  }

  setMap(map: Map): void {
    this.map = map;
    this.mapSignal.set(map);
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReadyComputed()) throw Error("Map is not ready");

    this.mapSignal()?.flyTo({
      zoom: 14,
      center: coords
    });

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }

  createMarkersFromPlaces(places: Feature[]) {
    // Crear instancias del erro para saber que error es
    if (!this.mapSignal()) throw Error("Mapa no inicializado");
    this.markers.update(marker => []);

    const newMarkers: Marker[] = [];

    for (const place of places) {

      const [lng, lat] = place.center;

      const popup = new Popup()
        .setHTML(`
          <h6>${place.text_es}</h6>
          <span>${place.place_name}</span>
        `);

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo( this.mapSignal()! );

        newMarkers.push(newMarker)
    }

    this.markers.update( markers => ({
      markers,
      ...newMarkers
    }))

  }
}
