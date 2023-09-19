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
  constructor() {
  
  }
  ngOnInit() {
    var canvas = <HTMLCanvasElement>document.getElementById('stage');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.fillStyle = "#D74022";
      ctx.fillRect(25, 25, 150, 150);

      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.clearRect(60, 60, 120, 120);
      ctx.strokeRect(90, 90, 80, 80);
    }
  }
}
