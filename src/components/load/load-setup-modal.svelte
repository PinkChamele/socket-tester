<script>
	import * as loadModel from '$lib/load-models/model-store.js';
	import { MetricsCollector } from '$lib/load-models/metrics-collector.js';
	import { BurstLoadModel } from '$lib/load-models/burst-load-model.js';
	import * as currentEvent from '$lib/current-event-store.js';
	import { ConstantLoadModel } from '$lib/load-models/constant-load-model.js';
	import { RampedLoadModel } from '$lib/load-models/ramped-load-model.js';

	const currentEventStore = currentEvent.store;
	const isSettingsVisibleStore = loadModel.isSettingsVisible;
	const metricsCollector = new MetricsCollector();


	// Load model types and configurations
	const loadModels = ['Burst', 'Constant', 'RampedUp'];

	let selectedModel = 'Burst';
	/** @type {number} */
	let burstCount;
	/** @type {number} */
	let interval;
	/** @type {number} */
	let timeout;
	/** @type {number} */
	let rampUpRate;

	const closeModal = () => loadModel.isSettingsVisible.set(false);

	// Event handler to save settings
	const saveBurstModel = () => {
		loadModel.store.set(
			new BurstLoadModel({
				eventName: $currentEventStore.eventName,
				body: JSON.parse($currentEventStore.bodyJSON),
			}, { timeout, burstCount, interval }, metricsCollector),
		);
		closeModal();
	};
	const saveConstantModel = () => {
		loadModel.store.set(
			new ConstantLoadModel({
				eventName: $currentEventStore.eventName,
				body: JSON.parse($currentEventStore.bodyJSON),
			}, { timeout, interval }, metricsCollector),
		);
		closeModal();
	};
	const saveRampedUpModel = () => {
		loadModel.store.set(
			new RampedLoadModel({
				eventName: $currentEventStore.eventName,
				body: JSON.parse($currentEventStore.bodyJSON),
			}, { timeout, interval, rampUpRate }, metricsCollector),
		);
		closeModal();
	}
</script>

{#if $isSettingsVisibleStore}
	<div class="modal">
		<div class="modal-content">
			<h2>Set Up Load Model</h2>

			<label for="loadModel">Select Load Model:</label>
			<select id="loadModel" bind:value={selectedModel}>
				{#each loadModels as model}
					<option value={model}>{model}</option>
				{/each}
			</select>

			<div>
				<label for="interval">Interval:</label>
				<input
					id="interval"
					type="number"
					bind:value={interval}
					placeholder="Interval between requests"
				/>
			</div>
			<div>
				<label for="timeout">Timout:</label>
				<input
					id="timeout"
					type="number"
					bind:value={timeout}
					placeholder="Request Timeout"
				/>
			</div>

			<div>
				{#if selectedModel === 'Burst'}
					<div>
						<label for="burstCount">Burst Count:</label>
						<input
							id="burstCount"
							type="number"
							bind:value={burstCount}
							placeholder="Number of requests in a burst"
						/>
					</div>
					<button class="save-modal" on:click={saveBurstModel}>Save</button>
				{/if}

				{#if selectedModel === 'RampedUp'}
					<div>
						<label for="rampUpRate">Ramped up rate:</label>
						<input
							id="rampUpRate"
							type="number"
							bind:value={rampUpRate}
							placeholder="Ramp up rate"
						/>
					</div>
					<button class="save-modal" on:click={saveRampedUpModel}>Save</button>
				{/if}

				{#if selectedModel === 'Constant'}
					<button on:click={saveConstantModel}>Save</button>
				{/if}
			</div>

			<div>
				<button on:click={closeModal}>Cancel</button>
			</div>
		</div>
	</div>
{/if}


<style>

    .settings-container > * {
    }

    .save-modal {
        margin: 1rem;
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background: var(--main-background-second);
        padding: 1rem;
        border-radius: 8px;
        width: 90%;
        max-width: 600px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .modal-content > * {
        margin: 1rem;
    }
</style>
