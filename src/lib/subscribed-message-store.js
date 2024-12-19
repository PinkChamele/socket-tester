import { writable } from 'svelte/store';
import * as socket from '$lib/socket-store.js';
import * as messages from '$lib/messages-store.js';

/**
 * @import { Writable } from "svelte/store"
 */

const localStoreKey = 'subscribedMessages';

/** @type {Writable<Set<string>>} */
export const store = writable(new Set());

export function bindToLocalStore() {
	/** @type {string | undefined} */
	const initialValueJSON = localStorage.getItem(localStoreKey);
	/** @type {string[]} */
	const initialValue = initialValueJSON ? JSON.parse(initialValueJSON) : [];

	store.subscribe((value) =>
		localStorage.setItem(
			localStoreKey,
			JSON.stringify(Array.from(value)),
		),
	);
	store.set(new Set(initialValue));
}

/** @param {string} message */
export function add(message) {
	store.update((messages) => messages.add(message));
	socket.subscribe(message, (data) => messages.push({
		name: message,
		data,
		isOutgoing: false,
		ackFor: null,
	}));
}

/** @param {string} message */
export function remove(message) {
	store.update((messages) => {
		messages.delete(message);
		socket.unsubscribe(message);

		return messages;
	})
}
