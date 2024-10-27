import { writable } from 'svelte/store';

/**
 * @import { Writable } from "svelte/store"
 */

const localStoreKey = 'subscribedEvents';
const initialValueJSON = localStorage.getItem(localStoreKey);

/** @type {Set<string>} */
const initialValue = new Set(initialValueJSON ? JSON.parse(initialValueJSON) : []);

/** @type {Writable<Set<string>>} */
export const subscribedEventsStore = writable(initialValue);

subscribedEventsStore.subscribe((value) =>
	localStorage.setItem(localStoreKey, JSON.stringify(value)),
);

/** @param {string} event */
export function addSubscribedEvent(event) {
	subscribedEventsStore.update((events) => events.add(event));
}

/** @param {string} event */
export function removeSubscribedEvent(event) {
	subscribedEventsStore.update((events) => {
		events.remove(event);

		return events;
	})
}
