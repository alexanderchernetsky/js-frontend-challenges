/**
 * Observer Pattern Practice
 *
 * A stock price that updates every 5 seconds.
 * Observers: UI display, Email alert (console log), Price history tracker (array).
 *
 * Your task is to implement the Observer pattern.
 * 1. Create a Subject class that maintains a list of observers.
 * 2. Implement methods to add, remove, and notify observers.
 * 3. Create Observer objects (or classes) that react to updates.
 *
 */

// Observable class. StockPrice = Subject
class StockPrice {
    price;
    observers;
    randomGeneratorIntervalId;

    constructor (initialValue) {
        this.price = initialValue;
        this.observers = new Set();
    }

    // add observer
    subscribe(observer) {
        this.observers.add(observer);
        console.log('New observer added.');
        return this; // Enable method chaining
    }

    // remove observer
    unsubscribe(observer) {
        this.observers.delete(observer);
        console.log('Observer removed.');
        return this;
    }

    notifyObservers(data) {
        if (this.observers.size === 0) return;

        this.observers.forEach(observer => {
            observer.update(data);
        })
    }

    setPrice(newPrice) {
        const previousPrice = this.price;
        this.price = newPrice;
        this.notifyObservers({subject: this, previousPrice, newPrice});
    }

    generateRandomPrices() {
        if (this.randomGeneratorIntervalId) return;
        console.log('Start generation');
        this.notifyObservers({ type: 'status', status: 'Active' });
        // generate random price in range between 100 and 1000 (USD)
        // update price every 5 seconds
        const id = setInterval(() => {
            const randomPrice = Math.floor(Math.random() * (1000 - 100) + 100);
            this.setPrice(randomPrice);
        }, 5000);
        this.randomGeneratorIntervalId = id;
    }

    stopPricesGeneration() {
        if (!this.randomGeneratorIntervalId) return;
        console.log('Stop generation');
        this.notifyObservers({ type: 'status', status: 'Stopped' });
        clearInterval(this.randomGeneratorIntervalId);
        this.randomGeneratorIntervalId = null;
    }
}


// Generic Observer class
class Observer {
    update(data) {
        throw new Error("Each Observer must implement it's own update method!");
    }
}

// Specific Observer - UI
class StatusDisplay extends Observer {
    update({ type, status }) {
        if (type === 'status') {
            const statusText = document.getElementById('status-text');
            if (statusText) {
                statusText.textContent = status;
                statusText.style.color = status === 'Active' ? '#2e7d32' : '#c62828';
            }
        }
    }
}

// Specific Observer - Price History Tracker
class PriceHistoryTracker extends Observer {
    history;

    constructor(initialPrice) {
        super();
        this.history = [initialPrice];
    }

    update(data) {
        if (data.newPrice === undefined) return;
        console.log(`PriceHistoryTracker update price: ${data.newPrice}`);
        this.history.push(data.newPrice);

        // display in UI that prices array has been populated
        const historyDisplay = document.getElementById('prices-history');
        if (historyDisplay) {
            historyDisplay.textContent = this.history.join(', ');
        }
    }
}

// Specific Observer - Email alert
class EmailAlert extends Observer {
    threshold;

    constructor(threshold) {
        super();
        this.threshold = threshold;
    }

    update(data) {
        if (data.newPrice === undefined) return;
        const previousPrice = data.previousPrice;
        const priceChangeInPercent = 100 * Math.abs(((previousPrice - data.newPrice) / previousPrice));
        console.log('EmailAlert priceChangeInPercent', priceChangeInPercent);
        if (priceChangeInPercent > this.threshold) {
            console.log(`Price has changed for more than ${this.threshold}%. Sending email alert`);

            // display in UI that email has been sent
            const emailDisplay = document.getElementById('emails-sent');
            if (emailDisplay) {
                const now = new Date().toLocaleTimeString();
                const newEntry = `Email sent at ${now} (Price change: ${priceChangeInPercent.toFixed(2)}%)`;
                if (emailDisplay.textContent === 'No emails sent yet') {
                    emailDisplay.textContent = newEntry;
                } else {
                    emailDisplay.textContent += ` | ${newEntry}`;
                }
            }
            // unsubscribe after the 1st email
            data.subject.unsubscribe(this);
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // constants
    const initialPrice = 500; // USD
    const thresholdInPercent = 20;

    // initialize instances
    const stockPrice = new StockPrice(initialPrice);
    const priceHistory = new PriceHistoryTracker(initialPrice);

    // Update UI with initial price history
    const historyDisplay = document.getElementById('prices-history');
    if (historyDisplay) {
        historyDisplay.textContent = priceHistory.history.join(', ');
    }

    const emailAlert = new EmailAlert(thresholdInPercent);
    const statusDisplay = new StatusDisplay();
    stockPrice.subscribe(priceHistory).subscribe(emailAlert).subscribe(statusDisplay);

    // add event listeners
    const startButton = document.getElementById('start-generation');
    const stopButton = document.getElementById('stop-generation');

    if (startButton) {
        startButton.addEventListener('click', () => {
            stockPrice.generateRandomPrices();
        });
    }

    if (stopButton) {
        stopButton.addEventListener('click', () => {
            stockPrice.stopPricesGeneration();
        })
    }
});
