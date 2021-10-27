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
import { SpirographComponent } from './spirograph/spirograph.component';
import { EpicycloidComponent } from './epicycloid/epicycloid.component';

@NgModule({
  declarations: [
    AppComponent,
    BubblesComponent,
    CircleWarpComponent,
    HomePageComponent,
    FractalArmsComponent,
    GlassTrianglesComponent,
    SpirographComponent,
    EpicycloidComponent
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
