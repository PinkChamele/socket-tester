import * as metrics from "$lib/metrics-store.js";

export class MetricsCollector {
	#totalRequests = 0;
	#successfulRequests = 0;
	#latencySum = 0;
	#startTime = performance.now();

	/** @type {Map<string, DOMHighResTimeStamp>} */
	#inFlightRequests = new Map();

	reinitialize() {
		this.#totalRequests = 0;
		this.#latencySum = 0;
		this.#successfulRequests = 0;
		metrics.clear();
		this.#inFlightRequests.clear();
		this.#startTime = performance.now();
	}

	startRecord() {
		const recordId = crypto.randomUUID();

		this.#inFlightRequests.set(recordId, performance.now());

		return recordId;
	}

	/**
	 * @param {string} recordId
	 * @param {boolean} isSuccess
	 */
	stopRecord(recordId, isSuccess) {
		const endTime = performance.now();
		const startTime = this.#inFlightRequests.get(recordId);

		if (!startTime) {
			return;
		}

		this.#inFlightRequests.delete(recordId);

		this.#latencySum += endTime - startTime;
		this.#totalRequests++;

		if (isSuccess) {
			this.#successfulRequests++;
		}

		this.#pushMetrics();
	}

	#pushMetrics() {
		const elapsedTime = (performance.now() - this.#startTime) / 1000;
		const requestRate = this.#totalRequests / elapsedTime;
		const avgLatency = this.#latencySum / this.#totalRequests || 0;
		const successRate = (this.#successfulRequests / this.#totalRequests) * 100 || 0;

		metrics.push({
			elapsedTime,
			requestRate,
			avgLatency,
			successRate,
		});
	}
}
