import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BtnCustomComponent } from '@shared/components/btn-custom/btn-custom.component';

@Component({
  selector: 'maps-search-results',
  standalone: true,
  imports: [CommonModule, BtnCustomComponent ],
  templateUrl: './search-results.component.html',
  styles: ``
})
export class SearchResultsComponent {

}
