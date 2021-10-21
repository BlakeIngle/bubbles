import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-circle-warp',
  templateUrl: './circle-warp.component.html',
  styleUrls: ['./circle-warp.component.css']
})
export class CircleWarpComponent implements OnInit {

  layerCount: number = 10; // how many circles in a stack
  ringCount: number = 10; // how many circles in a circle

  radius: number = 100; // radius of total circle

  minRadius: number = 10; // radius of smallest circle in a stack
  maxRadius: number = 100; // radius of largest circle in a stack

  smallVelocity: number = 0.01; // velocity of smallest circle in a stack
  largeVelocity: number = 0.00001; // velocity of largest circle in a stack
  // large velocity < small velocity - smaller objects have less mass

  layers: { r: number, theta: number }[][];

  constructor() { }

  ngOnInit(): void {
    this.makeCanvas();
  }

  makeCanvas() {
    return new p5((p) => {

      p.preload = () => {

      }

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        this.layers = [];
        for (let i = 0; i < this.layerCount; i++) {
          this.layers.push([])
          for (let j = 0; j < this.ringCount; j++) {
            let r = p.map(i, 0, this.layerCount - 1, this.minRadius, this.maxRadius);
            let theta = ((Math.PI * 2) / this.ringCount) * j;

            this.layers[i].push({ r: r, theta: theta });
          }
        }
      }

      p.draw = () => {
        p.background(0);
        for (let i = 0; i < this.layerCount - 1; i++) {
          this.moveLayer(i, p);
          this.drawLayer(i, p);
        }
      }

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      }
    });
  }

  moveLayer(i, p) {
    // rotate all circles based on layer index
    let layer = this.layers[i];
    let velocity = p.map(i, 0, this.layers.length, this.smallVelocity, this.largeVelocity)
    for (let circle of layer) {
      circle.theta = (circle.theta + velocity) % (Math.PI * 2)
    }
  }

  drawLayer(i, p) {
    // draw all circles in a layer based on index (i)
    p.push();
    p.translate(window.innerWidth / 2, window.innerHeight / 2)
    p.fill(255, 5);
    p.noStroke();
    let layer = this.layers[i];
    for (let circle of layer) {
      let x = this.radius * p.cos(circle.theta);
      let y = this.radius * p.sin(circle.theta);
      p.circle(x, y, circle.r)
    }
    p.pop();
  }

}
