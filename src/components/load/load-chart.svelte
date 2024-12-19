<script>
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		Title, CategoryScale,
	} from 'chart.js';
	import { onMount, onDestroy } from 'svelte';
	import * as metrics from '$lib/metrics-store.js';

	/**
	 * @import {Metrics} from "$lib/metrics-store.js"
	 */

	/** @type {Chart | null} */
	let chart;
	const metricsStore = metrics.store;

	Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

	/**
	 * @param {HTMLCanvasElement} canvas
	 */
	function initializeChart(canvas) {
		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels: [],
				datasets: []
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				animation: false,
				scales: {
					x: { title: { display: true, text: 'Time (s)' } },
					y: {
						title: { display: true, text: 'Metric Value' },
						suggestedMax: 100,
						beginAtZero: true,
						ticks: { stepSize: 10 }
					}
				},
				plugins: {
					legend: { display: true },
					title: { display: true, text: 'Load Test Metrics' }
				}
			}
		});
	}

	onMount(() => {
		const unsubscribe = metricsStore.subscribe((metrics) => {
			const canvas = document.getElementById('loadChart');

			if (metrics.length && canvas) {
				if (!chart) {
					initializeChart(canvas);
				}

				updateChart(metrics);
			} else if (chart) {
				chart.destroy();
				chart = null;
			}
		});

		onDestroy(() => {
			chart?.destroy();
			unsubscribe();
		});
	});

	/**
	 * @param {Metrics[]} metrics
	 */
	function updateChart(metrics) {
		if (!chart) {
			return;
		}

		/** @type {string[]} */
		const timeLabels = [];
		/** @type {number[]} */
		const requestRates = [];
		/** @type {number[]} */
		const avgLatencies = [];
		/** @type {number[]} */
		const successRates = [];

		metrics.forEach((metric) => {
			timeLabels.push(`${metric.elapsedTime.toFixed(2)}`);
			requestRates.push(metric.requestRate);
			avgLatencies.push(metric.avgLatency);
			successRates.push(metric.successRate);
		});

		chart.data.labels = timeLabels;
		chart.data.datasets = [
			{ label: 'Request Rate', data: requestRates, borderColor: 'rgba(75, 192, 192, 1)', backgroundColor: 'rgba(75, 192, 192, 0.2)', fill: true, tension: 0.3 },
			{ label: 'Average Latency (ms)', data: avgLatencies, borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.2)', fill: true, tension: 0.3 },
			{ label: 'Success Rate (%)', data: successRates, borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.2)', fill: true, tension: 0.3 }
		];

		chart.update();
	}
</script>

{#if $metricsStore.length}
	<div class="modal">
		<div class="modal-content">
			<button on:click={() => metrics.clear()}>Close</button>
			{#each (chart?.data.datasets ?? []) as dataset}
				<div class="manual-legend" id="manualLegend">
					<div class="legend-item">
						<span class="legend-color" style="background-color: {dataset.borderColor}"></span>
						<span>{dataset.label}</span>
					</div>
				</div>
			{/each}
			<div class="canvas-container">
				<canvas id="loadChart"></canvas>
			</div>

		</div>
	</div>
{/if}

<style>
    .manual-legend {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
        gap: 1rem;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
    }

    .legend-color {
        width: 16px;
        height: 16px;
        border-radius: 4px;
    }

    .canvas-container {
        width: 85%;
        height: 85%;
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
        height: 80%;
    }
</style>
