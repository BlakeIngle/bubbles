import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BubblesComponent } from './bubbles/bubbles.component';
import { CircleWarpComponent } from './circle-warp/circle-warp.component';
import { FractalArmsComponent } from './fractal-arms/fractal-arms.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "bubbles", component: BubblesComponent },
  { path: "circles", component: CircleWarpComponent },
  { path: "arms", component: FractalArmsComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
