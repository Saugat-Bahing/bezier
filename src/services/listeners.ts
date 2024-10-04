import { Coordinate, Size } from "src/typedefs";
import Observable from "../../src/utilities/observables/observable";
import Subject from "../../src/utilities/observables/subject";

export class Listeners {
    resizeSubject: Subject<Size>;
    resize$: Observable<Size>;
    mouseDownSubject: Subject<boolean>;
    mouseDown$: Observable<boolean>;
    mouseUpSubject: Subject<boolean>;
    mouseUp$: Observable<boolean>;
    mouseMoveSubject: Subject<Coordinate>;
    mouseMove$: Observable<Coordinate>;

    constructor() {
        this.resizeSubject = new Subject({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        this.resize$ = this.resizeSubject.asObservable();
        this.mouseDownSubject = new Subject(false);
        this.mouseDown$ = this.mouseDownSubject.asObservable();
        this.mouseUpSubject = new Subject(false);
        this.mouseUp$ = this.mouseUpSubject.asObservable();
        this.mouseMoveSubject = new Subject({ x: 0, y: 0 });
        this.mouseMove$ = this.mouseMoveSubject.asObservable();
    }

    startListner(canvas: HTMLCanvasElement) {
        this.startResizeListner();
        this.startMouseDownListner(canvas);
        this.startMouseUpListner(canvas);
        this.startMouseMoveListner(canvas);
    }

    private startResizeListner() {
        const resizeCallback = () => {
            this.resize$.emit({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", resizeCallback);
    }

    private startMouseDownListner(canvas: HTMLCanvasElement) {
        const mouseDownCallback = () => {
            this.mouseDown$.emit(true);
        };
        canvas.addEventListener("mousedown", mouseDownCallback);
    }

    private startMouseUpListner(canvas: HTMLCanvasElement) {
        const mouseUpCallback = () => {
            this.mouseUp$.emit(true);
        };
        canvas.addEventListener("mouseup", mouseUpCallback);
    }

    private startMouseMoveListner(canvas: HTMLCanvasElement) {
        const mouseMoveCallback = (event: MouseEvent) => {
            this.mouseMove$.emit({
                x: event.x,
                y: event.y,
            });
        };
        canvas.addEventListener("mousemove", mouseMoveCallback);
    }
}
