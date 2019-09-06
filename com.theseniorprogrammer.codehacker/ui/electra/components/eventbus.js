class EventBus {

    constructor() {
        this.listeners = [];
    }

    publish(args) {
        this.listeners.forEach(listener => listener(args));
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }
}

const BrowserToTheraphosaEventBus = new EventBus();

export {BrowserToTheraphosaEventBus}