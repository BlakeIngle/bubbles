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
        this.imgTag.nativeElement.src = fileReader.result
        let canvas = this.makeCanvas(img);

      }
      fileReader.readAsDataURL(file);

    }
  }

  makeCanvas(img) {
    return new p5((p) => {

      console.log(img);

      p.preload = () => {
        this.loadedImage = p.loadImage(img);
      }

      p.setup = () => {
        p.createCanvas(this.imgTag.nativeElement.width, this.imgTag.nativeElement.height);
      }

      p.draw = () => {

      }
    });
  }

}
