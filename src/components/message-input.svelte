<script>
	import * as socket from '$lib/socket-store.js';
	import * as messages from '$lib/messages-store.js';
	import * as currentEvent from '$lib/current-event-store.js';
	import * as loadModel from '$lib/load-models/model-store.js';
	import { } from './load/load-setup-modal.svelte';

	const statusStore = socket.statusStore;
	const currentEventStore = currentEvent.store;
	const loadModelStore = loadModel.store;

	function sendMessage() {
		const body = $currentEventStore.bodyJSON;
		const eventName = $currentEventStore.eventName;

		if ($statusStore !== 'connected' || !$currentEventStore.eventName) {
			return;
		}

		/** @type {unknown} */
		let parsedMessage;

		try {
			parsedMessage = body ? JSON.parse(body) : {};
		} catch {
			alert("Invalid JSON format");
		}

		const newLength = messages.push({
			name: eventName,
			data: parsedMessage,
			isOutgoing: true,
			ackFor: null,
		});

		socket.emit(eventName, parsedMessage, (data) => messages.push({
			name: eventName,
			data,
			isOutgoing: false,
			ackFor: newLength - 1,
		}));
		currentEvent.save();
	}

	function startLoadTest() {
		if ($statusStore !== 'connected' || !$currentEventStore.eventName || !$loadModelStore) {
			return;
		}

		$loadModelStore.start(12000);
	}

	function openLoadSettings() {
		loadModel.isSettingsVisible.set(true);
	}
</script>

<div id="message-input-area">
	<textarea bind:value={$currentEventStore.bodyJSON} placeholder="Message"></textarea>
	<form on:submit|preventDefault={sendMessage}>
		<input type="text" bind:value={$currentEventStore.eventName} placeholder="event" class="inputs-start" />
		<button type="submit" class="inputs-end">Send Message</button>
	</form>
	<button on:click={openLoadSettings}>Open load settings</button>
	<button on:click={startLoadTest}>Start load test</button>
</div>

<style>
    #message-input-area {
        margin-left: 5px;
        padding-top: 1rem;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: start;

        border-top: solid 2px var(--main-border);
    }

    #message-input-area textarea {
        width: 100%;
        min-height: 350px;

        resize: vertical;
    }

		#message-input-area > * {
        margin-top: 5px;
    }
</style>
