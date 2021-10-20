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
        console.log(fileReader)

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
        this.addNewCircles();
        this.growCircles();
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

  addNewCircles() {

    let newEachFrame = 100; // smaller number = bigger circles
    let maxAttempts = 10000; // more attempts = less empty space

    for (let i = 0; i < newEachFrame; i++) {
      let randomX = Math.floor(Math.random() * this.imgWidth);
      let randomY = Math.floor(Math.random() * this.imgHeight);
      this.pushToPool(randomX, randomY);
    }
  }

  pushToPool(x, y) {
    let rowPoolSize = this.imgHeight / this.circlePools.length;
    let rowPool = y / rowPoolSize
    rowPool = Math.ceil(rowPool) - 1;
    if (rowPool >= this.circlePools.length) {
      // not a valid pool
      console.log(rowPool);
      rowPool = this.circlePools.length - 1;
    } else if (rowPool < 0) {
      rowPool = 0;
    }

    let colPoolSize = this.imgWidth / this.circlePools[0].length;
    let colPool = x / colPoolSize
    colPool = Math.ceil(colPool) - 1;
    if (colPool >= this.circlePools[0].length) {
      // not a valid pool
      console.log(colPool);
      colPool = this.circlePools[0].length - 1;
    } else if (colPool < 0) {
      colPool = 0;
    }

    this.circlePools[rowPool][colPool].push(new Circle(x, y));
  }

  growCircles() {

  }

  drawCircles(p) {
    for (let row of this.circlePools) {
      for (let pool of row) {
        for (let circle of pool) {
          let canvasCoordinates = this.getCanvasXY(circle, p);

          let x = canvasCoordinates.x // where to draw on canvas
          let y = canvasCoordinates.y // where to draw on canvas
          p.circle(x, y, circle.r * 2);
        }
      }
    }
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

  map(n: number, minInput: number, maxInput: number, minOutput: number, maxOutput: number): number {
    return ((n - minInput) / (maxInput - minInput)) * (maxOutput - minOutput) + minOutput;
  }

}
