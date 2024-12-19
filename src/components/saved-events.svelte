<script>
	import * as events from '$lib/events-store.js';
	import * as currentEvent from '$lib/current-event-store.js';
	import { onMount } from 'svelte';

	/**
	 * @import {WsEvent} from "$lib/events-store.js"
	 */

	const eventsStore = events.store;
	const currentEventStore = currentEvent.store;

	onMount(() => {
		events.bindToLocalStore();
	});

	function addEventTab() {
		const newLength = events.addBlank();

		currentEvent.updateTabIndex(newLength - 1);
	}

	/**
	 *  @param {WsEvent} event
	 *  @param {number} index
	 */
	function openTab(event, index) {
		currentEvent.updateEventName(event.eventName);
		currentEvent.updateBody(event.bodyJSON);
		currentEvent.updateTabIndex(index);
	}

	/** @param {number} index */
	function closeTab(index) {
		events.remove(index);
		currentEvent.updateTabIndex(index);
	}
</script>

<div id="saved-events">
	{#each $eventsStore as event, index}
		<span class="button-list">
			<div class="event-tab" on:click={() => openTab(event, index)}>
				<span
					class="{'event-tab-name' + ($currentEventStore.tabIndex === index && ' event-tab-active')}"
				>{event.name}
				</span>
			</div>
			<button class="event-tab-close" on:click={() => closeTab(index)}>✕</button>
		</span>
	{/each}
	<button on:click={addEventTab}>+</button>
</div>

<style>
		.button-list {
				display: flex;
				flex-direction: row;
		}

    #saved-events {
        flex-basis: 13em;

        min-width: 10rem;
        display: flex;
        flex-direction: column;


        max-height: 100%;
        overflow-y: auto;
        overflow-x: visible;

        background-color: var(--main-background-second);
        border-bottom-left-radius: 0.3rem;
    }

    .event-tab {
        width: calc(100% - 0.3rem);
        box-sizing: border-box;

        left: -2px;
        position: relative;
    }

    .event-tab button {
        --hover-main: var(--event-tab-close-hover);
    }

    #new-event-tab {
        margin: 5px;
        margin-right: 9px;
        width: calc(100% - 10px);
    }

    .event-tab {
        padding: 3px 5px;
        position: relative;
        box-sizing: border-box;

        line-height: 1.1em;
        font-size: 1.2rem;

        margin: 0;

        background-color: var(--main-background-second);

        border-left: 2px solid var(--main-border);
    }

    .event-tab-active {
        background-color: var(--main-background);

        width: 100%;

        border-top-right-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;

        border-left: none;
    }

    .event-tab-active::before {
        content: "";
        position: absolute;
        box-sizing: border-box;
        top: -2px;
        left: 0.3rem;
        width: calc(100% - 0.3rem);
        bottom: -2px;

        border-top-right-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;

        border-top: 2px solid var(--main-border);
        border-right: 2px solid var(--main-border);
        border-bottom: 2px solid var(--main-border);

    }

    .event-tab-active+.event-tab,
    .event-tab:has(+ .event-tab-active) {
        border-left: none;
        position: relative;

        background-color: var(--main-background);
    }

    .event-tab-active+.event-tab {
        padding-left: 7px;
    }

    .event-tab:has(+ .event-tab-active) {
        padding-left: 7px;
    }

    .event-tab-active+.event-tab>*,
    .event-tab:has(+ .event-tab-active)>* {
        position: relative;
        z-index: 3;
    }

    .event-tab-active+.event-tab::before {
        border-top-left-radius: 0.3rem;
        border-top: 2px solid var(--main-border);
    }

    .event-tab:has(+ .event-tab-active)::before {
        border-bottom-left-radius: 0.3rem;
        border-bottom: 2px solid var(--main-border);
    }

    .event-tab-active+.event-tab::before,
    .event-tab:has(+ .event-tab-active)::before {
        content: "";
        display: block;
        background-color: var(--main-background-second);

        border-left: 2px solid var(--main-border);

        position: absolute;
        box-sizing: border-box;
        right: 0;
        bottom: 0;
        top: 0;
        left: 0;

        z-index: 1;
    }

    .event-tab > button {
        position: absolute !important;
        right: 5px;
        margin: auto;
        padding: 0;
        border: none;
        background-color: transparent;
        font-size: 1.2rem;

        opacity: 0;

        width: 1em;
        height: 1em;
    }
    .event-tab:hover > button {
        opacity: 1;
    }

    .event-tab-active > button {
        right: calc(0.3rem + 5px);
    }
</style>
