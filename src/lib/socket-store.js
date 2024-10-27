import { writable } from 'svelte/store';
import { io } from 'socket.io-client';

export const status = writable('disconnected');
export let socket;

export function connect(url, token) {
	if (socket) socket.disconnect();

	socket = io(url, {
		auth: { token },
		transports: ['websocket'],
	});

	socket.on('connect', () => status.set('connected'));
	socket.on('disconnect', () => status.set('disconnected'));
}

export function disconnect() {
	socket?.disconnect();
	status.set('disconnected');
}
