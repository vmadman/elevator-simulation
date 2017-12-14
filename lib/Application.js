/**
 * Defines the Application class.
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @since 0.1.0
 * @license MIT
 */
"use strict";

const BaseClass = require("./BaseClass");
const ElevatorController = require("./ElevatorController");

/**
 * An external wrapper to manage the elevator simulation.
 *
 * @extends BaseClass
 */
class Application extends BaseClass {

	constructor( cfg ) {
		super( cfg );
		this._initElevatorController();
	}

	/**
	 * Sets up the default values for new objects of this class.
	 *
	 * Note: This method is called automatically by the `#BaseClass` constructor
	 *
	 * @access private
	 * @returns {void}
	 */
	_initPropertyDefaults() {

		// Locals
		let me = this;

		// Call parent(s)
		super._initPropertyDefaults();

		// Settings
		me._groundFloor = 1;
		me._topFloor = 2;
		me._elevatorCount = 1;

		// State Variables
		me._elevators = [];

	}

	/**
	 * Instantiates the elevator controller.
	 *
	 * @access private
	 * @returns {ElevatorController} The newly instantiated elevator controller.
	 */
	_initElevatorController() {

		// Locals
		let me = this;

		// Idempotency...
		if( me._controller === undefined ) {

			me._controller = new ElevatorController(
				{
					groundFloor		: this._groundFloor,
					topFloor		: this._topFloor,
					elevatorCount	: this._elevatorCount
				}
			);
			
		}

		return me._controller;
		
	}

	/**
	 * Returns the internal elevator controller.
	 *
	 * @var {ElevatorController}
	 * @default new ElevatorController()
	 * @access public
	 */
	get controller() {
		return this._controller;
	}

}

module.exports = Application;