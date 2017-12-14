/**
 * Defines the ElevatorController class.
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @since 0.1.0
 * @license MIT
 */
"use strict";

const BaseClass = require("./BaseClass");
const Elevator = require("./Elevator");

/**
 * Description todo..
 */
class ElevatorController extends BaseClass {

	constructor( cfg ) {
		super( cfg );
		this._initElevators();
	}

	_initPropertyDefaults() {

		super._initPropertyDefaults();

		this._groundFloor = 1;
		this._topFloor = 2;
		this._elevatorCount = 1;
		this._elevators = [];

	}

	/**
	 * Because the simulation has rules that require
	 * the current location, destination, and active
	 * route of each elevator to be considered, we
	 * must be able to track movement over time.
	 *
	 * This method adds the concept of time, by way of
	 * abstract "steps", to the simulator.
	 */
	step() {

	}

	_initElevators() {

		let me = this;
		let count = me._elevatorCount;
		for( let i = 1; i<=count; i++ ) {

		}

	}

	createRequest( originFloor, destinationFloor ) {

		let me = this;
		// todo

	}


}

module.exports = ElevatorController;