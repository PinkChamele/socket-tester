import { AbstractLoadModel } from '$lib/load-models/abstract-load-model.js';

/**
 * @import {MetricsCollector} from "./metrics-collector.js"
 * @import {LoadOptions, LoadModel, EmitConfig} from "./abstract-load-model.js"
 */

/**
 * @implements {LoadModel}
 */
export class ConstantLoadModel extends AbstractLoadModel {
	/**
	 * @param {EmitConfig} emitConfig
	 * @param {LoadOptions} options
	 * @param {MetricsCollector} metricsCollector
	 */
	constructor(emitConfig, options, metricsCollector) {
		super(emitConfig, options, metricsCollector);
	}

	_emitWithPattern() {
		this._emit();
	}
}
