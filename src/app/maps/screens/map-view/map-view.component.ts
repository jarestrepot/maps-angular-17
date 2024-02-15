import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PlacesService } from '@maps/services/places.service';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent {

  private placesService = inject( PlacesService );

  constructor(){
    console.log( this.placesService.userLocationComputed() )
  }
}
