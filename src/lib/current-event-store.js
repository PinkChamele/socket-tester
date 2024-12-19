import { writable } from 'svelte/store';
import * as events from './events-store.js';

/**
 * @import { Writable } from "svelte/store"
 */

/**
 * @typedef	{Object} CurrentEvent
 * @property {string} eventName
 * @property {string} bodyJSON
 * @property {number | null} tabIndex
 */

/** @type {Writable<CurrentEvent>} */
export const store = writable({
	eventName: '',
	bodyJSON: '',
	tabIndex: null,
});

export function save() {
	store.update((currentEvent) => {
		if (currentEvent.tabIndex === null) {
			return currentEvent;
		}

		events.store.update((events) => {
			const event = events[currentEvent.tabIndex];

			event.bodyJSON = currentEvent.bodyJSON;
			event.eventName = currentEvent.eventName;
			event.name = currentEvent.eventName;

			return events;
		});

		return currentEvent;
	});
}

/**
 * @param {number} tabIndex
 */
export function updateTabIndex(tabIndex) {
	store.update((currentEvent) => {
		currentEvent.tabIndex = tabIndex;

		return currentEvent;
	});
}

/**
 * @param {string} eventName
 */
export function updateEventName(eventName) {
	store.update((currentEvent) => {
		currentEvent.eventName = eventName;

		return currentEvent;
	});
}

/**
 * @param {unknown} bodyJSON
 */
export function updateBody(bodyJSON) {
	store.update((currentEvent) => {
		currentEvent.bodyJSON = bodyJSON;

		return currentEvent;
	});
}
