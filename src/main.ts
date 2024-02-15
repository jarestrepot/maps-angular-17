import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

if (!navigator.geolocation) {
  throw new Error('No soport Geolocation');
  alert('No soport Geolocation')
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
