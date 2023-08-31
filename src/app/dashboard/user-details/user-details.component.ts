import { Component } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  appTitle = "Patients Details";
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555
};
zoom = 6;
}
