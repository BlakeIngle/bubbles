export class Circle {
    x: number; //location
    y: number; //location
    r: number; //radius

    growing: boolean = true; //circle grows unless growing = false

    /**
     * Initialize circle at x, y
     * @param x_ - x position
     * @param y_ - y position
     */
    constructor(x_: number, y_: number) {
        this.x = x_; //x position
        this.y = y_; //y position
        this.r = 1; //radius
    }

    /**
     * increases the size of the circle unless the edge touches
     * the edge of the frame or the edge of another circle
     */
    grow() {
        if (this.growing) {
            this.r = this.r + 0.3;
        }
    }

    /**
     * Check if the circle is touching the edge of the canvas
     * @param width - dimension of canvas
     * @param height - dimension of canvas
     * @returns 
     */
    edges(width: number, height: number) {
        return (
            this.x + this.r >= width ||
            this.x - this.r <= 0 ||
            this.y + this.r >= height ||
            this.y - this.r <= 0
        );
    }

    // /**
    //  * creates a circle at x, y using the images x, y 
    //  * to use as a fill color
    //  * @param img - image to reference color
    //  * @param p5 - the p5 library
    //  */
    // show(img, p5) {
    //     //all white circles
    //     //stroke(255);
    //     //strokeWeight(2);
    //     //noFill();

    //     //use color of image
    //     p5.noStroke();

    //     // get color of pixel
    //     // let c = myImage.get(this.x, this.y);
    //     // p5.fill(c);

    //     //and finally draw the "circle"
    //     p5.circle(this.x, this.y, this.r * 2, this.r * 2);
    // }
}
