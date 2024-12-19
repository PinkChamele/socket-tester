import { writable } from 'svelte/store';
import { io } from 'socket.io-client';

/**
 * @import { Writable } from "svelte/store"
 */

/**
 * @typedef {'connected' | 'disconnected'} ConnectionStatus
 */

/**
 * @typedef {Object} ConnectionProperties
 * @property {string} token
 * @property {string} url
 */

/** @type {Writable<ConnectionStatus>} */
export const statusStore = writable('disconnected');

export let socket = io({ autoConnect: false });

/**
 * @prop {ConnectionProperties} props
 */
export function connect(props) {
	if (socket.connected) {
		socket.disconnect();
	}

	socket = io(props.url, {
		auth: { token: props.token },
		query: {
			token: `Bearer ${props.token}`
		},
		transports: ['websocket', 'polling'],
		autoConnect: false
	});

	socket.on('connect', () => statusStore.set('connected'));
	socket.on('disconnect', () => statusStore.set('disconnected'));

	socket.connect();
}

export function disconnect() {
	socket.disconnect();
}

/**
 * @param {string} message
 * @param {(data: unknown) => unknown} listener
 */
export function subscribe(message, listener) {
	socket.on(message, listener);
}

/**
 * @param {string} message
 */
export function unsubscribe(message) {
	socket.off(message);
}

/**
 * @param {string} event
 * @param {unknown} data
 * @param {(data: unknown) => unknown} ack
 */
export function emit(event, data, ack) {
	socket.emit(event, data, ack);
}
