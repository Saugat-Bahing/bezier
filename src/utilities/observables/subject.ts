import Observable from "./observable";

export default class Subject<T> {
    state: T;
    observables: Observable<T>[];

    constructor(state: T) {
        this.state = state;
        this.observables = [];
    }

    getState(): T {
        return this.state;
    }

    setState(state: T) {
        this.state = state;
        this.observables.forEach((obs) => obs.emit(this.state));
    }

    private registerObservable(observable: Observable<T>) {
        this.observables.push(observable);
    }

    unregisterObservable(observable: Observable<T>) {
        this.observables = this.observables.filter((obs) => obs !== observable);
    }

    asObservable(): Observable<T> {
        const observable = new Observable<T>();
        this.registerObservable(observable);
        return observable;
    }
}
