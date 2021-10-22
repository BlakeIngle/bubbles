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

  innerRadius: number = 100; // radius of total circle for small circles
  outerRadius: number = 100; // radius of total circle for large circles

  minRadius: number = 10; // radius of smallest circle in a stack
  maxRadius: number = 100; // radius of largest circle in a stack

  smallVelocity: number = 0.01; // velocity of smallest circle in a stack
  largeVelocity: number = 0.00001; // velocity of largest circle in a stack
  // large velocity < small velocity - smaller objects have less mass

  smallTheta: number = 0; // rotation of smallest layer
  largeTheta: number = 0; // rotation of largest layer

  p;

  constructor() { }

  ngOnInit(): void {
    this.makeCanvas();
  }

  ngOnDestroy() {
    this.p.remove();
  }

  makeCanvas() {
    return new p5((p) => {

      this.p = p;

      p.preload = () => {

      }

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
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
    this.smallTheta = (this.smallTheta + this.smallVelocity) //% (Math.PI * 2);
    this.largeTheta = (this.largeTheta + this.largeVelocity) //% (Math.PI * 2);
    // rotate % 2pi
    // modulating by 2PI causes snapping
  }

  drawAllLayers(p) {
    // draw all circles in a layer based on number of layers
    p.push();
    p.translate(window.innerWidth / 2, window.innerHeight / 2)
    let opacity = 255 / this.layerCount
    p.fill(255, opacity);
    p.noStroke();

    for (let i = 0; i < this.layerCount; i++) {
      // draw one layer
      let layerTheta = p.map(i, 0, this.layerCount - 1, this.smallTheta, this.largeTheta);
      let layerCircleR = p.map(i, 0, this.layerCount - 1, this.minRadius, this.maxRadius);
      let layerPolarR = p.map(i, 0, this.layerCount - 1, this.innerRadius, this.outerRadius);
      for (let j = 0; j < this.ringCount; j++) {
        let circleTheta = (Math.PI * 2 / this.ringCount) * j
        let x = layerPolarR * p.sin(circleTheta + layerTheta);
        let y = layerPolarR * p.cos(circleTheta + layerTheta);
        p.circle(x, y, layerCircleR)
      }
    }

    p.pop();
  }

}
