import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-fractal-arms',
  templateUrl: './fractal-arms.component.html',
  styleUrls: ['./fractal-arms.component.css']
})
export class FractalArmsComponent implements OnInit {

  totalArms: number = 64;
  armSegments: number = 100;

  totalArmLength: number = 100; // each segment is half length of previous

  theta: number = 0; // rotation of the animation
  rotationSpeed: number = 0.01;

  constructor() { }

  ngOnInit(): void {
    this.setArmLength();
    this.makeCanvas();
  }

  private makeCanvas() {
    return new p5((p) => {

      p.preload = () => {

      }

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
      }

      p.draw = () => {
        p.background(30);
        this.rotateArms(p);
        this.drawAllArms(p);

      }

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        this.setArmLength();
      }
    });
  }

  private setArmLength() {
    this.totalArmLength = Math.min(window.innerHeight, window.innerWidth) / 2; // radius of shortest window dimension
  }

  private rotateArms(p) {
    this.theta = (this.theta + this.rotationSpeed) % (Math.PI * 2)
  }

  private drawAllArms(p) {
    p.push();
    p.translate(window.innerWidth / 2, window.innerHeight / 2)

    p.stroke(255);
    p.strokeWeight(3);

    for (let i = 0; i < this.totalArms; i++) {
      this.drawOneArm(i, p);
    }

    p.pop();
  }

  private drawOneArm(i, p) {
    // already translated to center
    p.push();
    p.rotate(((Math.PI * 2) / this.totalArms) * i);

    for (let j = 0; j < this.armSegments; j++) {
      p.push()
      // p.rotate(this.theta * ((j % 2 == 0) ? 1 : -1)) // scrunchy arms
      p.rotate(this.theta) // fractal rotate arms

      // let armLength = this.totalArmLength / ((j + 1) * 2)
      let armLength = this.totalArmLength / Math.pow(2, j + 1)
      p.line(0, 0, 0, -armLength);
      p.translate(0, -armLength);
    }
    for (let j = 0; j < this.armSegments; j++) {
      p.pop(); // pop all segment rotations and translates
    }
    p.pop(); // pop arm rotation
  }

}
