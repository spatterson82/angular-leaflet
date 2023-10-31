import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MarkerService } from './marker.service';
import { PopupService } from './popup.service';
import { ShapesService } from './shapes.service';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule  // Add libraries to use them
  ],
  providers: [
    MarkerService, 
    PopupService,
    ShapesService
  ],  // Add service as provider
  bootstrap: [AppComponent]
})
export class AppModule {

}
