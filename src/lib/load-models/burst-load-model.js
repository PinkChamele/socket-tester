import { AbstractLoadModel } from './abstract-load-model.js';

/**
 * @import {MetricsCollector} from "./metrics-collector.js"
 * @import {LoadOptions, LoadModel, EmitConfig} from "./abstract-load-model.js"
 */

/**
 * @typedef {LoadOptions} BurstLoadOptions
 * @property {number} burstCount - ms
 */

/**
 * @implements {LoadModel}
 */
export class BurstLoadModel extends AbstractLoadModel {
	/** @type {number} */
	#burstCount;

	/**
	 * @param {EmitConfig} emitConfig
	 * @param {BurstLoadOptions} options
	 * @param {MetricsCollector} metricsCollector
	 */
	constructor(emitConfig, options, metricsCollector) {
		const { burstCount, ...loadOptions } = options;

		super(emitConfig, loadOptions, metricsCollector);
		this.#burstCount = burstCount;
	}

	_emitWithPattern() {
		for (let i = 0; i < this.#burstCount; i++) {
			this._emit();
		}
	}
}
