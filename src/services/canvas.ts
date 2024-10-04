export class Canvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    background: string;

    constructor(
        element: HTMLCanvasElement,
        background: string | undefined = undefined
    ) {
        this.canvas = element;
        this.context = element.getContext("2d") as CanvasRenderingContext2D;
        if (!this.context) {
            throw "HTML Canvas not supported";
        }
        this.background = background ? "#1D1C1C" : (background as string);
    }

    clearCanvas() {
        const [width, height] = [this.canvas.width, this.canvas.height];
        this.context.fillStyle = this.background;
        this.context.rect(0, 0, width, height);
        this.context.fill();
    }
}
