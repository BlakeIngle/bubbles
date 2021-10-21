import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as p5 from 'p5';
import { Circle } from '../models/circle.model';

@Component({
  selector: 'app-bubbles',
  templateUrl: './bubbles.component.html',
  styleUrls: ['./bubbles.component.css']
})
export class BubblesComponent implements OnInit {

  @ViewChild('myImg') imgTag: ElementRef;

  fileName: string;
  fileString: string;

  loadedImage;

  circlePools: Circle[][][]; //all circles go into a pool
  poolColNum = 10; // 10 columns
  poolRowNum = 6; // 6 rows

  finished; // flag when to stop drawing
  fitImg: boolean = false; // do not constrain img element until img is loaded (get actual width of file)

  imgWidth: any; // actual width of img file
  imgHeight: any; //  ||   height   ||

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(event) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);

      var fileReader: FileReader = new FileReader();
      fileReader.onloadend = (e) => {
        let img = e.target.result;

        this.imgTag.nativeElement.onload = () => {
          let imgElement = this.imgTag.nativeElement
          this.imgWidth = imgElement.width;
          this.imgHeight = imgElement.height;
          this.fitImg = true;
        }

        this.imgTag.nativeElement.src = fileReader.result;
        let canvas = this.makeCanvas(img);

      }
      fileReader.readAsDataURL(file);

    }
  }

  makeCanvas(img) {
    return new p5((p) => {

      p.preload = () => {
        this.loadedImage = p.loadImage(img);
      }

      p.setup = () => {
        let element = this.imgTag.nativeElement
        p.createCanvas(element.width, element.height);
        if (element.width > element.height) {
          // landscape mode
          this.poolColNum = 10;
          this.poolRowNum = 6;
        } else if (element.width == element.height) {
          // square img
          this.poolColNum = 8;
          this.poolRowNum = 8;
        } else {
          // portrait mode
          this.poolColNum = 6;
          this.poolRowNum = 10;
        }

        this.circlePools = this.createPools();

      }

      p.draw = () => {
        if (this.finished) {
          return;
        }
        this.addNewCircles(p);
        this.growCircles(p);
        this.drawCircles(p);
      }

      p.windowResized = () => {
        let element = this.imgTag.nativeElement;
        p.resizeCanvas(element.width, element.height);
      }
    });
  }

  createPools(): Circle[][][] {
    let pools: Circle[][][] = [];
    for (let i = 0; i < this.poolRowNum; i++) {
      pools.push([])
      for (let j = 0; j < this.poolColNum; j++) {
        pools[i].push([])
      }
    }
    return pools;
  }

  addNewCircles(p) {

    let newEachFrame = 100; // smaller number = bigger circles
    let maxAttempts = 10000; // more attempts = less empty space
    let attempt = 1;

    for (let i = 0; i < newEachFrame; i++) {
      if (attempt > maxAttempts) {
        this.finished = true; // stop drawing
      }
      let randomX = Math.floor(Math.random() * this.imgWidth);
      let randomY = Math.floor(Math.random() * this.imgHeight);
      if (this.pushToPool(randomX, randomY, p)) {
        // pushed successfully
      } else {
        // failed to push (x, y position invalid)
        attempt++;
        i--;
      }
    }
  }

  pushToPool(x, y, p): boolean {
    let rowPoolSize = this.imgHeight / this.circlePools.length;
    let rowPool = y / rowPoolSize
    rowPool = Math.ceil(rowPool) - 1;
    if (rowPool >= this.circlePools.length) {
      // not a valid pool
      rowPool = this.circlePools.length - 1;
    } else if (rowPool < 0) {
      rowPool = 0;
    }

    let colPoolSize = this.imgWidth / this.circlePools[0].length;
    let colPool = x / colPoolSize
    colPool = Math.ceil(colPool) - 1;
    if (colPool >= this.circlePools[0].length) {
      // not a valid pool
      colPool = this.circlePools[0].length - 1;
    } else if (colPool < 0) {
      colPool = 0;
    }

    if (!this.positionForNewCircleIsValid(x, y, rowPool, colPool, p)) {
      // not valid x, y position
      return false;
    } else {
      let c = new Circle(x, y)
      this.circlePools[rowPool][colPool].push(c);
      return true;
    }
  }

  positionForNewCircleIsValid(x, y, rowPool, colPool, p): boolean {

    var isValid = true;

    // get all neighbor pools but NOT the actual circle pool
    let neighborPools = this.getAllNeighborPools(rowPool, colPool);

    //check all circles to not draw a circle in another circle
    const positionValidInPool = (pool: Circle[]): boolean => {

      let validPos = true;

      for (let c of pool) {
        // check if x, y is in another circle
        var d = p.dist(x, y, c.x, c.y); //distance from center of each circle
        if (d < c.r + 2) {
          //spot is in another circle
          validPos = false;
          break;
        }
      }
      return validPos
    }

    // check actual pool first (most likely)
    if (!positionValidInPool(this.circlePools[rowPool][colPool])) {
      return false; // invalid x, y position
    }

    // check all neighbor pools second just in case its on the edge
    for (let pool of neighborPools) {
      if (!positionValidInPool(pool)) {
        return false; // invalid x, y position
      }
    }

    return isValid; // circle did not intersect another circle
  }

  growCircles(p) {
    for (let row in this.circlePools) {
      for (let col in this.circlePools[row]) {
        // row col :: i j
        let pool = this.circlePools[row][col];
        // check all circles in all pools
        for (let c of pool) {
          this.handleAllCollisionsForCircle(c, Number(row), Number(col), p);
        }
      }
    }
  }

  handleAllCollisionsForCircle(c: Circle, row: number, col: number, p) {
    if (c.growing) {
      // check if circle is touching the edge of the canvas
      if (c.edges(this.imgWidth, this.imgHeight)) {
        c.growing = false;
      } else {
        // check pool and all neighbor pools for collisions
        let pool = this.circlePools[row][col];
        this.handleAllCollisionsForCircleInOnePool(c, pool, p)
        let neighborPools = this.getAllNeighborPools(row, col);

        for (let neighborPool of neighborPools) {
          if (c.growing) {
            this.handleAllCollisionsForCircleInOnePool(c, neighborPool, p);
          } else {
            break;
          }
        }
        if (c.growing) {
          c.grow(); // update
        }
      }
    } else {
      return; // not growing
    }
  }

  handleAllCollisionsForCircleInOnePool(c, pool, p) {

    for (let otherC of pool) {

      if (c != otherC) { // do not compare circle to itself

        let d = p.dist(c.x, c.y, otherC.x, otherC.y);
        if (c.r + otherC.r >= d) {
          // if r1 + r2 >= distance from centers
          // then the circles touch/overlap
          c.growing = false;
          otherC.growing = false;
          return; // done. circle collided
        }
      }
    }
  }

  drawCircles(p) {
    for (let row of this.circlePools) {
      for (let pool of row) {
        for (let circle of pool) {
          this.drawOneCircle(circle, p);
        }
      }
    }
  }

  drawOneCircle(circle, p) {
    let canvasCoordinates = this.getCanvasXY(circle, p);

    let x = canvasCoordinates.x // where to draw on canvas
    let y = canvasCoordinates.y // where to draw on canvas
    p.circle(x, y, circle.r * 2);
  }

  getAllNeighborPools(_i, _j): any[] {
    let neighbors = [];
    rowLoop: for (let i = _i - 1; i <= _i + 1; i++) {
      if (i < 0 || i >= this.circlePools.length) {
        // index out of bounds
        continue rowLoop;
      }
      let row = this.circlePools[i];
      colLoop: for (let j = _j - 1; j <= _j + 1; j++) {
        if (j < 0 || j >= row.length) {
          // index out of bounds
          continue colLoop;
        } else if (i == _i && j == _j) {
          // not neighbor, is actual
          continue;
        } else {
          // index in bounds :: neighbor
          neighbors.push(row[j]);
        }
      }
    }

    return neighbors;
  }

  getCanvasXY(circle: Circle, p) {
    let canvasX = p.map(circle.x, 0, this.imgWidth, 0, this.imgTag.nativeElement.width);
    let canvasY = p.map(circle.y, 0, this.imgHeight, 0, this.imgTag.nativeElement.height);

    return { x: canvasX, y: canvasY }
  }

  getRadiusScaledForCanvas(r) {
    return (r / this.imgWidth) * this.imgTag.nativeElement.width
  }

  map(n: number, minInput: number, maxInput: number, minOutput: number, maxOutput: number): number {
    return ((n - minInput) / (maxInput - minInput)) * (maxOutput - minOutput) + minOutput;
  }

}
