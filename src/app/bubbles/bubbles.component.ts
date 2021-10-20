import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as p5 from 'p5';

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

  circlePools; //all circles go into a pool
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

        this.circlePools = [];
        for (let i = 0; i < this.poolRowNum; i++) {
          this.circlePools.push([])
          for (let j = 0; j < this.poolColNum; j++) {
            this.circlePools[i].push([])
          }
        }

        this.circlePools.forEach((row, i) => {
          row.forEach((pool, j) => {
            this.getAllNeighborPools(i, j)
          });
        });
      }

      p.draw = () => {
        let img = this.imgTag.nativeElement;
        p.rect(img.width - 30, img.height - 30, 30, 30)
      }

      p.windowResized = () => {
        let element = this.imgTag.nativeElement;
        p.resizeCanvas(element.width, element.height);
      }
    });
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

}
