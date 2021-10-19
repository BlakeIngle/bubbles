import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BubblesComponent } from './bubbles/bubbles.component';

const routes: Routes = [
  { path: "", component: BubblesComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
