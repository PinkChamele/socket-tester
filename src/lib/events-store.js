import { writable } from 'svelte/store';

/**
 * @import { Writable } from "svelte/store"
 */

/**
 * @typedef {Object} WsEvent
 * @property {string} name
 * @property {string} eventName
 * @property {string} bodyJSON
 */

/** @type {Writable<WsEvent[]>} */
export const store = writable([]);

const localStoreKey = 'events';

export function bindToLocalStore() {
	/** @type {string | undefined} */
	const initialValueJSON = localStorage.getItem(localStoreKey);
	/** @type {WsEvent[]} */
	const initialValue = initialValueJSON ? JSON.parse(initialValueJSON) : [];

	store.subscribe((value) =>
		localStorage.setItem(
			localStoreKey,
			JSON.stringify(value),
		),
	);
	store.set(initialValue);
}

export function addBlank() {
	/** @type {number} */
	let newLength;

	store.update((events) => {
		newLength = events.push({
			name: 'New Tab',
			eventName: '',
			bodyJSON: '',
		});

		return events;
	});

	return newLength;
}

/**
 * @param {number} index
 */
export function remove(index) {
	store.update((events) => {
		events.splice(index, 1);

		return events;
	});
}
