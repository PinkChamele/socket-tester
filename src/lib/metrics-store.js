import { writable } from 'svelte/store';

/**
 * @import { Writable } from "svelte/store"
 */

/**
 * @typedef {Object} Metrics
 * @property {number} requestRate
 * @property {number} avgLatency
 * @property {number} successRate
 * @property {number} elapsedTime
 */

/** @type {Writable<Metrics[]>} */
export const store = writable([]);

/**
 * @param {Metrics} metric
 */
export function push(metric) {
	store.update((metrics) => {
		metrics.push(metric);

		return metrics;
	});
}

export function clear() {
	store.set([]);
}
