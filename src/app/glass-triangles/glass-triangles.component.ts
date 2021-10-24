import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-glass-triangles',
  templateUrl: './glass-triangles.component.html',
  styleUrls: ['./glass-triangles.component.css']
})
export class GlassTrianglesComponent implements OnInit {

  triangles: GlassTriangle[]
  destroy;

  constructor() { }

  ngOnInit(): void {
    // this.setArmLength();
    // this.generateTriangles();
    this.makeCanvas();
  }

  ngOnDestroy() {
    this.destroy();
  }

  private makeCanvas() {
    return new p5((p) => {

      this.destroy = p.remove;

      p.preload = () => {

      }

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
      }

      p.draw = () => {
        // p.background(30);
        // this.moveTriangles(p);
        // this.drawAllTriangles(p);

      }

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        // this.setArmLength();
      }
    });
  }

  generateTriangles() {
    // pick random theta, get x, y of that angle at outer end of some radius
    // pick 3 of these random points to make a circle
    //    this is the starting state
    // pick 3 more to make an end state
    // pick a random color
  }

}

interface Triangle {
  x1: number;
  y1: number;

  x2: number;
  y2: number;

  x3: number;
  y3: number;
}

interface MovingTriangle {
  start: Triangle;
  end: Triangle;
}

interface GlassTriangle extends MovingTriangle {
  color;
}