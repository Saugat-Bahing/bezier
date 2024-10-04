import { Canvas } from "./services/canvas";
import { Listeners } from "./services/listeners";
import { Size } from "./typedefs";

const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
if (!canvasElement) {
    throw "Canvas element not found.";
}
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

canvasElement.width = WIDTH;
canvasElement.height = HEIGHT;

const canvas = new Canvas(canvasElement);
canvas.clearCanvas();
const listeners = new Listeners();
listeners.startListner(canvasElement);
listeners.resize$.subscribe((size: Size) => {
    console.log(size);
});

class UserRepository {
    findAll() {
        return "hello";
    }
}

// clearCanvas(canvas);
// const ctx = canvas.getContext('2d');

// const clickSubject = new Subject<Coordinate>({x: 0, y: 0});
// const click$ = new Observable<Coordinate>();
// clickSubject.registerObservable(click$);

// canvas.addEventListener('click', (event) => {
//     click$.emit({x: event.x, y: event.y});
// });

// click$.subscribe((data: Coordinate) => {
//     console.log(data);
// })
