/**
 * Decorator Pattern
 *
 * Implement withTiming and withCallCount functions that add measuring behavior without modifying logic.
 * withTiming: logs the time taken by the function to execute.
 * withCallCount: logs the number of times the function has been called.
 *
 * Example:
 * const calculate = (n) => { ... };
 * const enhancedCalculate = withTiming(withCallCount(calculate));
 */


// solution
/**
 * Decorator that measures the execution time of a function.
 * @param {Function} fn
 * @param {Function} [onLog] Optional callback for logging
 * @returns {Function}
 */
function withTiming(fn, onLog) {
    return (...args) => {
        const before = performance.now();

        const result = fn.apply(this, args);

        const after = performance.now();
        const executionTime = after - before;
        const message = 'Execution time: ' + executionTime.toFixed(2) + 'ms';
        console.log(message);
        if (onLog) onLog(message, 'timing');

        return result;
    }
}

/**
 * Decorator that counts how many times a function has been called.
 * @param {Function} fn
 * @param {Function} [onLog] Optional callback for logging
 * @returns {Function}
 */
function withCallCount(fn, onLog) {
    let count = 0;
    return (...args) => {
        count++;
        const message = `Call count: ${count}`;
        console.log(message);
        if (onLog) onLog(message, 'count');
        return fn.apply(this, args);
    }
}

// UI Logic
document.addEventListener('DOMContentLoaded', () => {
    const runButton = document.getElementById('run-decorator');
    const resultDisplay = document.getElementById('decorator-result');
    const logsContainer = document.getElementById('decorator-logs');
    const clearButton = document.getElementById('clear-logs');

    const addLog = (message, type) => {
        if (!logsContainer) return;
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logsContainer.prepend(logEntry);
    };

    // Sample function to decorate
    function expensiveTask(n = 10_000_000) {
        let sum = 0;
        for (let i = 0; i < n; i++) {
            sum += i;
        }
        return sum;
    }

    // Decorate the function
    const decoratedTask = withCallCount(withTiming(expensiveTask, addLog), addLog);

    if (runButton) {
        runButton.addEventListener('click', () => {
            const result = decoratedTask();
            if (resultDisplay) {
                resultDisplay.textContent = `Result of task with n=10.000.000: ${result}`;
            }
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            if (logsContainer) logsContainer.innerHTML = '';
            if (resultDisplay) resultDisplay.textContent = 'Results will appear here';
        });
    }
});
