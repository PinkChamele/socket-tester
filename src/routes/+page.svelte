<script>
	import ConnectForm from '../components/connect-form.svelte';
	import MessageInput from '../components/message-input.svelte';
	import SubscribedMessages from '../components/subscribed-message.svelte';
	import SavedEvents from '../components/saved-events.svelte';

	let url = 'localhost:3000/api/v1';
	let token = '';


</script>

<main>
	<ConnectForm url="{url}" token="{token}" />
	<section id="alerts"></section>
	<section id="main-panel">
		<MessageInput />
		<SubscribedMessages />
		<SavedEvents />
	</section>
	<section id="messages"></section>
</main>

<style>
    #alerts {
        position: fixed;
        top: 3rem;
        right: 50%;

        transform: translateX(-50%);
    }

    #main-panel {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;

        max-height: 500px;
    }

    #messages {
        margin-top: 20px;

        padding: 5px;

        display: flex;
        flex-direction: column-reverse;
    }

		:global {
        input,
        button,
        textarea {
            font-size: 1rem;

            padding: 4px 7px;

            color: var(--input-text);

            --vibrate-color: var(--input-invalid);

            background-color: var(--input-background);
        }

        textarea {
            background-color: var(--main-textarea-background);
            color: var(--main-textarea-text);
            border: 1px solid var(--main-textarea-border);
        }

        button {
            border: none;
            border-radius: 5px;

            transition: box-shadow 0.2s ease-in;
        }

        button:hover {
            /* green glow border effect */
            box-shadow: 0 0 2px 1px var(--hover-main);
        }

        :root {
            --main-background: white;
            --main-text: black;
            --main-background-second: #eeeeee;
            --main-border: #e2e2e2;

            --vibrate-color: gold;

            --hover-main: #4eea5e;

            --hover-secondary: #4eea5e;

            --alert-main: #4b1919;
            --alert-border: #420909;
            --alert-vibrate-color: #700f0f;

            --main-background-inactive: #d5d5d5;
            --main-text-inactive: #aaa;

            --main-textarea-background: #e0e0e0;
            --main-textarea-text: #0f0f0f;
            --main-textarea-border: #aaa;

            --input-border: #aaa;
            --input-background: #f3f3f3;
            --input-text: black;
            --input-invalid: #ff0000;

            --unsubscribe-button-color: red;

            --indicator-disconnected: #e26464;
            --indicator-connected: #4eea5e;
            --indicator-reconnecting: #e2e264;

            --event-tab-close-hover: #e9e9e9;

            --json-key-color: #0000ff;
            --json-string-color: #a80000;
            --json-number-color: #009c00;
            --json-boolean-color: #7700ff;
            --json-null-color: #0000ff;
        }

        [data-theme="dark"] {
            --main-background: #272727;
            --main-text: white;
            --main-background-second: #2e2e2e;
            --main-border: #000000;

            --vibrate-color: gold;

            --hover-main: #4eea5e;

            --hover-secondary: #4eea5e;

            --alert-main: #4e1010;
            --alert-border: #420909;
            --alert-vibrate-color: #700f0f;

            --main-background-inactive: #3b3b3b;
            --main-text-inactive: #aaa;

            --main-textarea-background: #393b47;
            --main-textarea-text: #d4d4d4;
            --main-textarea-border: #000000;

            --input-border: #000000;
            --input-background: #4e4e4e;
            --input-text: white;
            --input-invalid: #c50000;

            --unsubscribe-button-color: red;

            --indicator-disconnected: #9b1d1d;
            --indicator-connected: #146b1d;
            --indicator-reconnecting: #866213;

            --event-tab-close-hover: #e9e9e9;

            --json-key-color: #6a95f1;
            --json-string-color: #b6522a;
            --json-number-color: #47a547;
            --json-boolean-color: #a200ff;
            --json-null-color: #657cff;
        }

        * {
            transition: background-color 0.7s, border-color 0.2s;
        }

        body {
            background-color: var(--main-background);
            color: var(--main-text);
            font-family: "Roboto", sans-serif;
            font-size: 1rem;
            margin: 0;
        }
    }
</style>
