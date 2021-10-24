import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BubblesComponent } from './bubbles/bubbles.component';
import { CircleWarpComponent } from './circle-warp/circle-warp.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FractalArmsComponent } from './fractal-arms/fractal-arms.component';
import { GlassTrianglesComponent } from './glass-triangles/glass-triangles.component';

@NgModule({
  declarations: [
    AppComponent,
    BubblesComponent,
    CircleWarpComponent,
    HomePageComponent,
    FractalArmsComponent,
    GlassTrianglesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
