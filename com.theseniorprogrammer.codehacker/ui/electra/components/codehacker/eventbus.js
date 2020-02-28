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

// pathmaster view buttons ---> theraphosa editor
const CallToTheraphosaEventBus = new EventBus();
const MethodToTheraphosaEventBus = new EventBus();
const BindToTheraphosaEventBus = new EventBus();

// codemaster ---> pathmaster line
const CodeMasterToPathMasterLineEventBus = new EventBus();

export {
    BrowserToTheraphosaCallsEventBus, 
    BrowserToTheraphosaMethodsEventBus, 
    CallToTheraphosaEventBus, 
    MethodToTheraphosaEventBus,
    BindToTheraphosaEventBus,
    CodeMasterToPathMasterLineEventBus
}