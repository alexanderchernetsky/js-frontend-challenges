class EventEmitter {
    constructor() {
        this.events = {};
    }

    addListener(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    trigger(event, ...args) {
        if (!this.events[event]) {
            console.warn(`Event ${event} does not exist`);
            return;
        }
        this.events[event].forEach(listener => listener(...args));
    }

    removeListeners(event) {
        if (!this.events[event]) {
            return;
        }
        delete this.events[event];
    }
}

const eventEmitter = new EventEmitter();

eventEmitter.addListener('log-fruits', (...data) => console.log(...data));
eventEmitter.trigger('log-fruits', 'orange', 'banana');

eventEmitter.removeListeners('log-fruits');

eventEmitter.trigger('log-fruits', 'apple', 'pear'); // this will not log anything

