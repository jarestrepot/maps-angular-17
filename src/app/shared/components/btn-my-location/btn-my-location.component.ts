import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-btn-my-location',
  standalone: true,
  imports: [],
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  txtButton = input.required<string>({ alias: 'btn-text'});

  goToMyLocation(){
    console.log('Go to location');
  }
}
