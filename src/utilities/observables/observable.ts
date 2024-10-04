import { Subscriber } from "./subscriber";

export default class Observable<T> {
    private subscribers: Subscriber[];
    constructor() {
        this.subscribers = [];
    }

    subscribe(callback: Function) {
        const subscriber = new Subscriber(callback, this.unsubscribe);
        this.subscribers.push(subscriber);
    }

    private unsubscribe(subscriber: Subscriber) {
        this.subscribers = this.subscribers.filter((sub) => sub.uuid !== subscriber.uuid);
    }

    emit(state: T): void {
        this.subscribers.forEach((sub) => sub.callback(state));
    }
}
