import { writable } from 'svelte/store';

/**
 * @import { Writable } from "svelte/store"
 * @import {LoadModel} from "./abstract-load-model.js"
 */

/** @type {Writable<LoadModel | null>} */
export const store = writable(null);

/** @type {Writable<boolean>} */
export const isSettingsVisible = writable(false);
