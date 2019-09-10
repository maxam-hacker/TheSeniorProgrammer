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

const BrowserToTheraphosaCallsEventBus = new EventBus();
const BrowserToTheraphosaMethodsEventBus = new EventBus();

export {BrowserToTheraphosaCallsEventBus, BrowserToTheraphosaMethodsEventBus}