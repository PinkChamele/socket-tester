<script>
	import {status, connect, disconnect} from '$lib/socket-store.js';

	/**
	 * @import {ChangeEventHandler} from 'svelte/elements'
	 */

	/** @type {string} */
	export let url;
	/** @type {string} */
	export let token;

	function handleConnect() {
		if (!url || !token) {
			alert("Please provide both URL and Token.");

			return;
		}

		if ($status === 'connected') {
			disconnect();
		} else {
			connect();
		}
	}

	/** @type {ChangeEventHandler<HTMLInputElement>} */
	function toggleTheme(event) {
		const theme = event.currentTarget.checked ? 'dark' : 'light';

		document.documentElement.setAttribute('data-theme', theme);
	}
</script>

<div id="url-input" class="form">
	<input type="text" bind:value={url} placeholder="url" class="inputs-start" />
	<input type="text" bind:value={token} placeholder="token" class="inputs-middle" />
	<button on:click={handleConnect} class="inputs-end">Connect</button>
	<div class="indicator {$status}">{$status}</div>

	<label id="theme-switch" class="theme-switch">
		Dark:
		<input type="checkbox" id="checkbox_theme" on:change="{toggleTheme}" />
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
