/**
 * Defines the Elevator class.
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @since 0.1.0
 * @license MIT
 */
"use strict";

const BaseClass = require("./BaseClass");

/**
 * Description todo..
 */
class Elevator extends BaseClass {

	constructor( cfg ) {
		super( cfg );
	}

	_initPropertyDefaults() {
		super._initPropertyDefaults();

		this._isOccupied = false;
		this._currentFloor = 1;
		this._enRoute = false;
		this._destinationFloor = null;
		this._totalTrips = 0;
		this._totalFloorsPassed = 0;
		this._requiresMaintenance = false;
		this._maxTripsBeforeMaintenance = 100;
		this._isDoorsOpen = false;

	}

	get isOccupied() {
		return this._isOccupied;
	}

	get currentFloor() {
		return this._currentFloor;
	}

	get enRoute() {
		return this._enRoute;
	}

	_configure( cfg ) {
		super._configure( cfg );
	}

	_onFloorArrival() {
		this._totalFloorsPassed++;
	}

	_onFloorDeparture() {

	}

	_onDoorsOpened() {

	}

	_onDoorsClosed() {

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

}

module.exports = Elevator;