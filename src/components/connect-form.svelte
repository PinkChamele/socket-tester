<script>
	import { onMount } from 'svelte';
	import { statusStore, connect, disconnect } from '$lib/socket-store.js';
	import * as theme from '$lib/theme-store.js';

	/**
	 * @import {ChangeEventHandler} from "svelte/elements"
	 * @import {ConnectionProperties} from "$lib/socket-store"
	 */

	/** @type {ConnectionProperties} */
	let connectionProps = { url: '', token: '' };

	const themeStore = theme.store;

	onMount(() => {
		const connectionPropsJSON = localStorage.getItem('connectionProps');

		if (connectionPropsJSON) {
			connectionProps = JSON.parse(connectionPropsJSON);
		}
	});

	function handleConnect() {
		if (!connectionProps.url || !connectionProps.token) {
			alert("Please provide both URL and Token.");

			return;
		}

		if ($statusStore !== 'connected') {
			connect(connectionProps);

			localStorage.setItem('connectionProps', JSON.stringify(connectionProps));
		} else {
			disconnect();
		}
	}

	onMount(() => {
		theme.bindToLocalStore();
		themeStore.subscribe((value) => document.documentElement.setAttribute('data-theme', value));
	});

	/** @type {ChangeEventHandler<HTMLInputElement>} */
	function toggleTheme(event) {
		const newTheme = event.currentTarget.checked ? 'dark' : 'light';

		theme.set(newTheme);
	}
</script>

<div id="url-input" class="form">
	<input type="text" bind:value={connectionProps.url} placeholder="url" class="inputs-start" />
	<input type="text" bind:value={connectionProps.token} placeholder="token" class="inputs-middle" />
	<button on:click={handleConnect} class="inputs-end">Connect</button>
	<div class="indicator {$statusStore}">{$statusStore}</div>

	<label id="theme-switch" class="theme-switch">
		Dark:
		<input
			type="checkbox"
			id="checkbox_theme"
			on:change="{toggleTheme}"
			checked="{$themeStore === 'dark'}"
		/>
	</label>
</div>

<style>
    #url-input {
        background-color: var(--main-background-second);
    }

    .inputs-start {
        margin: 5px 0 5px 5px;

        border: 1px solid var(--input-border);
        border-radius: 5px 0 0 5px;
        border-right: none;
    }

    .inputs-middle {
        margin: 5px 0;

        border-radius: 0;
        border: 1px solid var(--input-border);
        border-right: none;
    }

    .inputs-end {
        margin: 5px 5px 5px 0;

        border: 1px solid var(--input-border);
        border-radius: 0 5px 5px 0;
    }

    .indicator {
        display: inline-block;
        padding: 5px;
        border-radius: 5px;
        color: white;
    }

    .indicator.disconnected {
        background-color: var(--indicator-disconnected);
    }

    .indicator.connected {
        background-color: var(--indicator-connected);
    }

    .indicator.reconnecting {
        background-color: var(--indicator-reconnecting);
    }

    #theme-switch {
        position: absolute;
        top: 5px;
        right: 5px;
    }
</style>
