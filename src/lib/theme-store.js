import { writable } from 'svelte/store';

/**
 * @import { Writable } from "svelte/store"
 */

/**
 * @typedef {'dark' | 'light'} Theme
 */

const localStoreKey = 'theme';

/** @type {Writable<Theme>} */
export const store = writable('light');

export function bindToLocalStore() {
	/** @type {Theme} */
	const initialValue = localStorage.getItem(localStoreKey) ?? 'light';

	store.subscribe((value) =>
		localStorage.setItem(localStoreKey, value),
	);
	store.set(initialValue);
}

/**
 * @param {Theme} theme
 */
export function set(theme) {
	store.set(theme);
}
