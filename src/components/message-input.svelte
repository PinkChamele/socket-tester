<script>
	import { status, socket } from '$lib/socket-store.js';

	let eventName = '';
	let message = '';

	function sendMessage() {
		if ($status === 'connected' && eventName) {
			try {
				const parsedMessage = message ? JSON.parse(message) : {};

				socket.emit(eventName, parsedMessage);
			} catch {
				alert("Invalid JSON format");
			}
		}
	}
</script>

<div id="message-input-area">
	<textarea bind:value={message} placeholder="Message"></textarea>
	<form on:submit|preventDefault={sendMessage}>
		<input type="text" bind:value={eventName} placeholder="event" class="inputs-start" />
		<button type="submit" class="inputs-end">Send Message</button>
	</form>
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
</style>
