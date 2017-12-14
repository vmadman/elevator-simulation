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

		// State Variables
		this._isOccupied = false;
		this._enRoute = false;
		this._isDoorsOpen = false;
		this._currentFloor = 1;
		this._destinations = [];
		this._requiresMaintenance = false;

		// Tracking
		this._totalTrips = 0;
		this._totalFloorsPassed = 0;
		this._totalSteps = 0;

		// Settings
		this._topFloor = 5;
		this._maxTripsBeforeMaintenance = 100;

		// Debugging
		this._loggingEnabled = false;

	}

	enableLogging() {
		let me = this;
		me._loggingEnabled = true;
	}

	disableLogging() {
		let me = this;
		me._loggingEnabled = false;
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
		let destination = me.nextDestination;

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

		// We always spend a step on closing our doors
		if( me.isDoorsOpen ) {
			me._closeDoors();
			return;
		}

		// Operations applicable when we have a destination
		if( destination !== null ) {

			// If we're already on the pickup floor, just
			// open our doors and let the passenger in.
			if( destination === me.currentFloor ) {
				me.logEvent("At Destination (Floor #" + me.currentFloor + ")");
				me._openDoors();
				return;
			} else {

				// Progress towards destination
				if( destination > me.currentFloor ) {
					me.logEvent("Moving up toward destination");
					me._currentFloor++;
				} else {
					me.logEvent("Moving down toward destination");
					me._currentFloor--;
				}

				// Track "floors passed" per sim requirement #8
				me._totalFloorsPassed++;

				me.logEvent("... current    : " + me.currentFloor );
				me.logEvent("... destination: " + destination     );

			}

		}

	}

	willPass( floor ) {



	}

	get nextDestination() {

		let me = this;
		if( me._destinations.length === 0 ) {
			//me.logEvent("... no upcoming destinations found")
			return null;
		} else {
			me.logEvent("... upcoming destinations: " + me._destinations.join(", ") );
			return me._destinations[0];
		}

	}

	_addDestination( floor ) {

		let me = this;

		// todo: destinations should be injected intelligently
		//       so that step usage can be minimized.

		me.logEvent("Adding new destination: Floor #" + floor);
		me._destinations.push( floor );

	}

	_removeDestination() {

		let me = this;
		if( me._destinations.length === 0 ) {
			return;
		} else {
			me._destinations.shift();
		}

	}

	addPickup( floor ) {

		let me = this;
		me.logEvent("Received pickup request on floor #" + floor);
		this._addDestination( floor );

	}

	addDropOff( floor ) {

		let me = this;
		me.logEvent("Received drop-off instruction at floor #" + floor);
		this._addDestination( floor );

	}



	_openDoors() {
		let me = this;
		me.logEvent("Opening Doors");
		me._isDoorsOpen = true;

		// Each time the doors open we can remove
		// a destination (todo: consider if this is always true)
		me._removeDestination();

		// Determine if we're enroute
		if( me.nextDestination === null ) {
			me._enRoute = false;
			me._isOccupied = false;
			me.logEvent("Final Destination Reached (Idle)");
		}

	}

	_closeDoors() {
		let me = this;
		me.logEvent("Closing Doors");
		me._isDoorsOpen = false;

		// Determine if we're enroute
		if( me.nextDestination !== null ) {
			me._enRoute = true;
			me._isOccupied = true;
			me.logEvent("Enroute...");
		} else {
			me.logEvent("Awaiting dropoff instructions...");
		}

	}

	logEvent( txt ) {

		let me = this;
		if( me._loggingEnabled === false ) {
			return;
		}

		console.log( "[elevator] " + txt );
	}

}

module.exports = Elevator;