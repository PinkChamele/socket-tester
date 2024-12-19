<script>
	import JsonViewer from './json-viewer/json-viewer.svelte';
	import * as messages from '$lib/messages-store.js';

	const eventsStore = messages.store;
</script>

{#each $eventsStore as message}
	<div class="event-record">
		<span class="traffic-direction {message.isOutgoing ? 'outgoing' : 'incoming'}">
			{message.isOutgoing ? '⬆' : '⬇'}
		</span>
		<span style="font-weight: bold" class="event-name">
			{#if message.ackFor !== null}
				<button class="ack">↧</button>
			{/if}
			{message.name}
		</span>
		{#if message.data}
			<JsonViewer data="{message.data}"></JsonViewer>
		{/if}
	</div>
{/each}

<style>
	.traffic-direction {
			font-weight: bold;
	}

	.traffic-direction.outgoing {
			color: red;
	}

	.traffic-direction.incoming {
			color: green;
	}

  .event-record {
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 1px solid var(--main-border);

      margin-top: 2px;
      padding: 3px;
      border-radius: 5px;
  }

</style>
