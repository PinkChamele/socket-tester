<script>
	import { socket } from '$lib/socket-store.js';
	import {addSubscribedEvent, subscribedEventsStore} from '$lib/subscribed-events-store.js';

	let eventName = '';

	function subscribe() {
		addSubscribedEvent(eventName);


		socket.on(eventName,
			/** @param {unknown} data */
			(data) => console.log(`Received ${eventName}`, data),
		);
	}
</script>

<div id="subscribed-messages">
	<div>Subscribed to:</div>
	<ul>
		{#each $subscribedEventsStore as event}
			<li>{event}</li>
		{/each}
	</ul>
	<form on:submit|preventDefault={subscribe}>
		<input type="text" bind:value={eventName} placeholder="event" />
		<button type="submit">Subscribe</button>
	</form>
</div>

<style>
    #subscribed-messages {
        padding-top: 1rem;

        display: flex;
        flex-direction: column;
        justify-content: stretch;
        padding-left: 20px;

        flex-basis: 12rem;

        border-top: solid 2px var(--main-border);
        border-top-right-radius: 0.3rem;

        position: relative;
    }

    #subscribed-messages::after {
        content: "";
        position: absolute;
        top: -2px;
        right: -2px;
        width: 0.6rem;
        height: 0.6rem;
        border-right: solid 2px var(--main-border);
        border-top: solid 2px var(--main-border);
        border-top-right-radius: 0.3rem;

        z-index: 4;
    }

    #subscribed-messages>*:not(#subscribed-messages-list) {
        height: fit-content
    }

    #subscribed-messages-list {
        flex-grow: 2;

        display: flex;
        flex-direction: column;

        overflow-y: auto;
        max-height: 100%;

        padding: 10px;
    }
</style>
