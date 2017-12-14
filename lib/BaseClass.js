/**
 * Defines the BaseClass.
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @since 0.1.0
 * @license MIT
 */
"use strict";

const _ 	= require( "lodash" );
const TIPE 	= require( "tipe" );
const EYES 	= require( "eyes" );

/**
 * An abstract root class that ALL project classes inherit from.
 *
 * @abstract
 */
class BaseClass {

	constructor( cfg ) {
		let me = this;
		me._initPropertyDefaults();
		me._configure( cfg );
	}

	/**
	 * Sets up the default values for new objects of this class.
	 * This method is called automatically by the `#BaseClass`.
	 *
	 * @access private
	 * @returns {void}
	 */
	_initPropertyDefaults() {

		// Locals
		let me = this;

		// By default, we'll disable log output..
		me._loggingEnabled = false;

	}


	/**
	 * Applies the configuration object, which is passed, automatically
	 * by the `BaseClass`'s constructor, but can be called after instantiation
	 * as a way to reconfigure the object.
	 *
	 * @access private
	 * @param {object} cfg A configuration object that can be used to override
	 *        the default property values.
	 * @returns {void}
	 */
	_configure( cfg ) {

		// Locals
		let me = this;

		// Apply each config value to the object with
		// a "_" prefix to denote private accessibility.
		_.each( cfg, function( val, key ) {

			let propertyName = "_" + key;
			me[ propertyName ] = val;

		});


	}

	// -- Debugging / Logging --------------------------------------------------


	/**
	 * Enables log output.
	 *
	 * @access public
	 * @returns {void}
	 */
	enableLogging() {
		let me = this;
		me._loggingEnabled = true;
	}

	/**
	 * Disables log output.
	 *
	 * @access public
	 * @returns {void}
	 */
	disableLogging() {
		let me = this;
		me._loggingEnabled = false;
	}

	/**
	 * Logs a single value.
	 *
	 * @param {string} prefix The prefix to apply to the log output.
	 * @param {*} txt The value to log.
	 * @private
	 */
	_logEventWithPrefix( prefix, txt ) {

		let me = this;
		if( me._loggingEnabled === false ) {
			return;
		}

		console.log( "[" + prefix + "] " + txt );
	}

}

module.exports = BaseClass;