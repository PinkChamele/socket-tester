<script>
	import { onMount } from 'svelte';
	import * as subscribedMessages from '$lib/subscribed-message-store.js';

	let newEventName = '';
	const subscribedMessagesStore = subscribedMessages.store;

	onMount(() => {
		subscribedMessages.bindToLocalStore();
	});

	function subscribe() {
		subscribedMessages.add(newEventName);
	}

	/**
	 * @param {string} eventName
	 */
	function unsubscribe(eventName) {
		subscribedMessages.remove(eventName);
	}
</script>

<div id="subscribed-messages">
	<div>Subscribed to:</div>
	<div class="subscribed-messages-list">
		{#each Array.from($subscribedMessagesStore) as event}
			<div>
				<div
					class='event-subscription'
					id="event-sub-${event.replaceAll(/\//g, '-')}"
				>
					{event}
					<span class="button-list">
						<button
							class="unsubscribe-button hidden"
							on:click="{() => unsubscribe(event)}"
						>✖</button>
					</span>
				</div>
			</div>
		{/each}
	</div>
	<form on:submit|preventDefault={subscribe}>
		<input type="text" bind:value={newEventName} placeholder="event" />
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

    #subscribed-messages>*:not(.subscribed-messages-list) {
        height: fit-content
    }

    .subscribed-messages-list {
        flex-grow: 2;

        display: flex;
        flex-direction: column;

        overflow-y: auto;
        max-height: 100%;

        padding: 10px;
    }
</style>
