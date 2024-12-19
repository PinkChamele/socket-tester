import { writable } from 'svelte/store';

/**
 * @import { Writable } from "svelte/store"
 */

/**
 * @typedef {Object} Message
 * @property {string} name
 * @property {unknown} data
 * @property {boolean} isOutgoing
 * @property {number | null} ackFor
 */

/** @type {Writable<Message[]>} */
export const store = writable([]);

/**
 * @param {Message} message
 */
export function push(message) {
	/** @type {number} */
	let newLength;

	console.log(message);

	store.update((messages) => {
		newLength = messages.push(message);

		return messages;
	});

	return newLength;
}
