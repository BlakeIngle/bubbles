
import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-epicycloid',
  templateUrl: './epicycloid.component.html',
  styleUrls: ['./epicycloid.component.css']
})
export class EpicycloidComponent implements OnInit {

  shape: any[];
  circles: Circle[];

  speedConstant: number = (Math.PI * 2) * 0.0005; // lower number => smoother line
  play: boolean = true;
  finished: boolean = false;
  showCircles: boolean = true;

  destroy;

  constructor() { }

  ngOnInit(): void {
    // this.setArmLength();
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
        this.shape = [];
        this.createCircles(p);
        this.play = true;
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(10);
      }

      p.draw = () => {
        // p.background(0, 5); // second number is opacity
        // low opacity causes a fade away effect
        p.background(10);
        p.translate(window.innerWidth / 2, window.innerHeight / 2)
        this.rotateCircles(p);

        this.drawCircles(p);

        this.drawShape(p);

      }

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        // this.setArmLength();
      }

      p.mouseClicked = () => {
        this.pause(p);
      }

      p.keyPressed = () => {
        if (p.keyCode === 32) {
          // console.log("space bar")
          this.showCircles = !this.showCircles;
        }
      }
    });
  }

  createCircles(p) {
    this.circles = [];
    this.circles.push(
      { r: 75, t: 0, speed: 2 },
      { r: 50, t: 0, speed: 16 },
      { r: 100, t: 0, speed: -32 },
    )
  }

  rotateCircles(p) {
    for (let c of this.circles) {
      c.t += c.speed * this.speedConstant
    }
    if (this.circles[0].t >= (Math.PI * 2) * 2) {
      this.finished = true;
      p.noLoop();// stop drawing after 1 rotation(s)
    }
  }

  drawCircles(p) {
    let c1 = this.circles[0];
    let c2 = this.circles[1];
    let c3 = this.circles[2];

    let x = 0;
    let y = 0;

    this.drawOneCircle(c1, x, y, 0, p);

    x += (c1.r + c2.r) * p.cos(c1.t);
    y += (c1.r + c2.r) * p.sin(c1.t);
    this.drawOneCircle(c2, x, y, c1.t, p);

    x += (c2.r + c3.r) * p.cos(c1.t + c2.t);
    y += (c2.r + c3.r) * p.sin(c1.t + c2.t);

    this.drawOneCircle(c3, x, y, c1.t + c2.t, p);

    x += (c3.r) * p.cos(c1.t + c2.t + c3.t);
    y += (c3.r) * p.sin(c1.t + c2.t + c3.t);

    p.fill(255, 30, 30)
    p.circle(x, y, 7);
    this.updateShape(x, y, p);

  }

  private drawOneCircle(c, x1, y1, t, p) {

    if (!this.showCircles) {
      return;
    }

    p.noFill();
    p.colorMode(p.RGB, 255);
    p.stroke(255, 150);
    p.strokeWeight(2);
    p.circle(x1, y1, (c.r * 2)); // circle actual

    let x2 = c.r * p.cos(c.t + t)
    let y2 = c.r * p.sin(c.t + t);

    p.strokeWeight(1);
    p.line(x1, y1, x1 + x2, y1 + y2); // line to edge of circle

    p.noStroke();
    p.fill(255);
    p.circle(x1, y1, 5, 5); // circle at center
  }

  updateShape(x, y, p) {
    let v = p.createVector(x, y);
    this.shape.push(v);
    if (v != this.shape[0] && v.x == this.shape[0].x && v.y == this.shape[0].y) {
      //closed shape
      console.log('closed')
    }
  }

  drawShape(p) {
    p.noFill();
    p.colorMode(p.HSB, 100);
    p.strokeWeight(2);
    let h = p.map(this.circles[0].t % (Math.PI * 2), 0, Math.PI * 2, 0, 100);
    p.stroke(h, 75, 50);
    p.beginShape()
    for (let v of this.shape) {
      p.vertex(v.x, v.y)
    }
    p.endShape()
  }

  pause(p) {
    this.play = !this.play;

    (this.play && !this.finished) ? p.loop() : p.noLoop();
  }

}

class Circle {
  r: number;
  t: number;
  speed: number;
}
