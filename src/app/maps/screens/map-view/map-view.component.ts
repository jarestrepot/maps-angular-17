import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, computed, inject } from '@angular/core';
import { PlacesService } from '@maps/services/places.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  private placesService = inject(PlacesService);
  @ViewChild('mapDiv')
  public mapDivElement!: ElementRef;
  public isReadyUserLocationComputed = computed(() => this.placesService.isUserLocationReadyComputed())


  constructor() {
  }

  ngAfterViewInit(): void {

    if (!this.placesService.userLocationComputed()) throw new Error('Error loacation');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.placesService.userLocationComputed(),
      zoom: 14, // starting zoom
    });

    const popup = new Popup()
      .setHTML(`
        <h6>I'm here</h6>
        <span>Estoy en este lugar del mundo!!</span>
      `);

    new Marker({ color: 'red'})
      .setLngLat( this.placesService.userLocationComputed() ?? [0, 0] )
      .setPopup( popup )
      .addTo( map );


  }

}
