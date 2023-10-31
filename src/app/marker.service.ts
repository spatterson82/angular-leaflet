import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';  // import leaflet in every service/module that needs it

import { PopupService } from './popup.service';  // service in a service

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  geojson_capitals: string = '/assets/data/usa-capitals.geojson';
  
  constructor(
    private http: HttpClient, 
    private popupService: PopupService
  ) { }

  static scaleRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  makeCapitalMarkers(map: any): void {
    this.http.get(this.geojson_capitals).subscribe((result: any) => {
      const maxPop = Math.max(...result.features.map((x: any) => x.properties.population), 0);
      for (const capital of result.features) {
        const lon = capital.geometry.coordinates[0];
        const lat = capital.geometry.coordinates[1];
        // const marker = L.marker([lat + .2, lon + .2]);
        // marker.addTo(map);
        const circle = L.circleMarker([lat, lon], {
          radius: MarkerService.scaleRadius(capital.properties.population, maxPop)
        });
        circle.bindPopup(this.popupService.makeCapitalPopup(capital.properties));
        circle.addTo(map);
      }
    });
  }
}
