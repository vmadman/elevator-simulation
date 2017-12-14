/**
 * Defines the Elevator class.
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @since 0.1.0
 * @license MIT
 */
"use strict";

const BaseClass = require("./BaseClass");
const TIPE = require("tipe");

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
		this._topFloor = 5;
		this._enRoute = false;
		this._destinations = [];
		this._totalTrips = 0;
		this._totalFloorsPassed = 0;
		this._requiresMaintenance = false;
		this._maxTripsBeforeMaintenance = 100;
		this._isDoorsOpen = false;
		this._totalSteps = 0;

	}

	get isOccupied() {
		return this._isOccupied;
	}

	get currentFloor() {
		return this._currentFloor;
	}

	get topFloor() {
		return this._topFloor;
	}

	get enRoute() {
		return this._enRoute;
	}

	get totalTrips() {
		return this._totalTrips;
	}

	get totalFloorsPassed() {
		return this._totalFloorsPassed;
	}

	get requiresMaintenance() {
		return this._requiresMaintenance;
	}

	get isDoorsOpen() {
		return this._isDoorsOpen;
	}

	get enRoute() {
		return this._enRoute;
	}

	get totalSteps() {
		return this._totalSteps;
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
	 *
	 * @access public
	 * @param {Number?} [count=1] The number of steps to take; by default,
	 *        only one step will be taken.
	 * @returns {void}
	 */
	step( count ) {

		// Locals
		let me = this;

		// Process the optional param that allows
		// for multiple steps to be taken in one call.
		if( TIPE( count ) === "number" ) {
			for( let i = 1; i<=count; i++ ) {
				me.step();
			}
			return;
		}

		// Count Steps
		me._totalSteps++;

		// If we're already on the pickup floor, just
		// open our doors and let the passenger in.
		if( floor === me.currentFloor ) {
			me._openDoors();
			return;
		}

	}



	get nextDestination() {

		let me = this;


	}

	_addDestination( floor ) {

		let me = this;

		// todo: destinations should be injected intelligently
		//       so that step usage can be minimized.

		me.logEvent("Adding new destination: Floor #" + floor);
		me._destinations.push( floor );

	}

	addPickup( floor ) {

		let me = this;
		this._addDestination( floor );

	}

	addDropOff( floor ) {

	}

	_openDoors() {
		let me = this;
		logEvent("Opening Doors");
		me._isDoorsOpen = true;
	}

	_closeDoors() {
		let me = this;
		logEvent("Closing Doors");
		me._isDoorsOpen = false;
	}

	logEvent( txt ) {
		console.log( "[elevator] " + txt );
	}

}

module.exports = Elevator;