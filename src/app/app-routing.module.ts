import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BubblesComponent } from './bubbles/bubbles.component';
import { CircleWarpComponent } from './circle-warp/circle-warp.component';
import { EpicycloidComponent } from './epicycloid/epicycloid.component';
import { FractalArmsComponent } from './fractal-arms/fractal-arms.component';
import { GlassTrianglesComponent } from './glass-triangles/glass-triangles.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SpirographComponent } from './spirograph/spirograph.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "bubbles", component: BubblesComponent },
  { path: "circles", component: CircleWarpComponent },
  { path: "arms", component: FractalArmsComponent },
  { path: "glass", component: GlassTrianglesComponent },
  { path: "spirograph", component: SpirographComponent },
  { path: "epicycloid", component: EpicycloidComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
