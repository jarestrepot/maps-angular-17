import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {


  private userLocation = signal<[number, number] | undefined>(undefined);

  public userLocationComputed = computed( () => this.userLocation());

  public isUserLocationReadyComputed = computed( () =>{
    return !!this.userLocation();
  });

  constructor() {
    this.getUserLocation();
  }


  public async getUserLocation(): Promise<[number, number]> {
    return new Promise<[number, number]>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation.update(currentValue => [coords.longitude, coords.latitude]);
          resolve([coords.longitude, coords.latitude]);
        },
        (err) => {
          console.log(err);
          alert('No se pudo obtener la geolocalización');
          reject();
        }
      )
    });
  }

}
