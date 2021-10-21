import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-circle-warp',
  templateUrl: './circle-warp.component.html',
  styleUrls: ['./circle-warp.component.css']
})
export class CircleWarpComponent implements OnInit {

  layerCount: number = 100; // how many circles in a stack
  ringCount: number = 5; // how many circles in a circle

  radius: number = 100; // radius of total circle

  minRadius: number = 10; // radius of smallest circle in a stack
  maxRadius: number = 100; // radius of largest circle in a stack

  smallVelocity: number = 0.01; // velocity of smallest circle in a stack
  largeVelocity: number = 0.00001; // velocity of largest circle in a stack
  // large velocity < small velocity - smaller objects have less mass

  layers: {
    small: { r: number, theta: number },
    large: { r: number, theta: number }
  }

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
        this.layers = {
          small: { r: this.minRadius, theta: 0 },
          large: { r: this.maxRadius, theta: 0 }
        };
      }

      p.draw = () => {
        p.background(0);
        this.moveLayers(p);
        this.drawAllLayers(p);

      }

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      }
    });
  }

  moveLayers(p) {
    this.layers.small.theta = (this.layers.small.theta + this.smallVelocity) //% (Math.PI * 2);
    this.layers.large.theta = (this.layers.large.theta + this.largeVelocity) //% (Math.PI * 2);
    // rotate % 2pi
    // modulating by 2PI causes snapping
  }

  drawAllLayers(p) {
    // draw all circles in a layer based on number of layers
    p.push();
    p.translate(window.innerWidth / 2, window.innerHeight / 2)
    p.fill(255, 5);
    p.noStroke();

    for (let i = 0; i < this.layerCount; i++) {
      // draw one layer
      let layerTheta = p.map(i, 0, this.layerCount - 1, this.layers.small.theta, this.layers.large.theta);
      let layerR = p.map(i, 0, this.layerCount - 1, this.layers.small.r, this.layers.large.r);
      for (let j = 0; j < this.ringCount; j++) {
        let circleTheta = (Math.PI * 2 / this.ringCount) * j
        let x = this.radius * p.sin(circleTheta + layerTheta);
        let y = this.radius * p.cos(circleTheta + layerTheta);
        p.circle(x, y, layerR)
      }
    }

    p.pop();
  }

}
