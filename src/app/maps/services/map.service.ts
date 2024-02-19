import { Injectable, computed, inject, signal } from '@angular/core';
import { DirectionsApiClient } from '@maps/api/directionsApiClient';
import { DirectionsResponse, Route } from '@maps/interfaces/directions.interface';
import { Feature } from '@maps/interfaces/places.interface';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  // Whit Signals
  private mapSignal = signal<Map | undefined>(undefined);
  private markers = signal<Marker[]>([]);
  private directionsApi = inject(DirectionsApiClient);

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

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {
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
        .addTo(this.mapSignal()!);

      newMarkers.push(newMarker)
    }

    this.markers.update(markers => ({
      markers,
      ...newMarkers
    }));

    if (places.length === 0) return;

    // LIMITES DEL MAPA (Subir el scroll de los mapas)

    const bounds = new LngLatBounds();
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);

    this.mapSignal()!.fitBounds(bounds, {
      padding: 200
    });

  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(({ routes }) => this.drawPolyLine(routes[0]))
  }

  private drawPolyLine({ geometry, distance, duration }: Route) {
    console.log({ distance: distance / 1000, duration: duration / 60 })

    const [start, end] = geometry.coordinates as [[number, number], [number, number]];
    const coords = geometry.coordinates;


    const bounds = new LngLatBounds();
    coords.forEach( ([lng, lat]) => {
      bounds.extend([ lng, lat ]);
    });

    this.mapSignal()!.fitBounds(bounds, {
      padding: 200
    });

    //LineString
    
  }
}
