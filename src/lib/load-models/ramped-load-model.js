import { AbstractLoadModel } from '$lib/load-models/abstract-load-model.js';

/**
 * @import {MetricsCollector} from "./metrics-collector.js"
 * @import {LoadOptions, LoadModel, EmitConfig} from "./abstract-load-model.js"
 */

/**
 * @typedef {LoadOptions} RampedLoadOptions
 * @property {number} rampUpRate
 */

/**
 * @implements {LoadModel}
 */
export class RampedLoadModel extends AbstractLoadModel {
	/** @type {number} */
	#rampUpRate;

	/**
	 * @param {EmitConfig} emitConfig
	 * @param {RampedLoadOptions} options
	 * @param {MetricsCollector} metricsCollector
	 */
	constructor(emitConfig, options, metricsCollector) {
		super(
			emitConfig,
			{
				timeout: options.timeout,
				interval: options.interval,
			},
			metricsCollector,
		);

		this.#rampUpRate = options.rampUpRate;
	}

	_emitWithPattern() {
		this._emit();
		this._options.interval *= this.#rampUpRate;
		this._clearInterval();
		this._setInterval();
	}
}
