import { socket } from '$lib/socket-store.js';

/**
 * @interface LoadModel
 */
/**
 * @function
 * @name LoadModel#start
 * @returns {void}
 */
/**
 * @function
 * @name LoadModel#stop
 * @param {number} duration
 * @returns {void}
 */

/**
 * @typedef {Object} LoadOptions
 * @property {number} interval
 * @property {number} timeout
 */

/**
 * @typedef	{Object} EmitConfig
 * @property {string} eventName
 * @property {unknown} body
 */

/**
 * @abstract
 * @class
 * @implements {LoadModel}
 */
export class AbstractLoadModel {
	/** @type {LoadOptions} */
	_options;

	/** @type {EmitConfig} */
	#emitConfig;

	/** @type {number | undefined} */
	#intervalId;

	/** @type {MetricsCollector} */
	#metricsCollector;

	/**
	 * @protected
	 * @param {EmitConfig} emitConfig
	 * @param {LoadOptions} options
	 * @param {MetricsCollector} metricsCollector
	 */
	constructor(emitConfig, options, metricsCollector) {
		this.#emitConfig = emitConfig;
		this._options = options;
		this.#metricsCollector = metricsCollector;
	}

	_emit() {
		const recordId = this.#metricsCollector.startRecord();

		socket
			.timeout(this._options.timeout)
			.emit(this.#emitConfig.eventName, this.#emitConfig.body, (error) =>
				this.#metricsCollector.stopRecord(recordId, !error),
			);
	}

	/**
	 * @protected
	 * @abstract
	 */
	_emitWithPattern() {}

	_setInterval() {
		this.#intervalId = setInterval(
			() => this._emitWithPattern(),
			this._options.interval,
		);
	}

	_clearInterval() {
		clearInterval(this.#intervalId);
		this.#intervalId = undefined;
	}

	/**
	 * @param {number} duration
	 */
	start(duration) {
		this.#metricsCollector.reinitialize();
		this._setInterval();
		setTimeout(() => this.stop(), duration);
	}

	stop() {
		this._clearInterval();
	}
}
