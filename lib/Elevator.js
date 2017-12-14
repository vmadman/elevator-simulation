/**
 * Defines the Elevator class.
 *
 * @author Luke Chavers <me@lukechavers.com>
 * @since 0.1.0
 * @license MIT
 */
"use strict";


// Dependencies
const BaseClass = require("./BaseClass");
const TIPE = require("tipe");


/**
 * Represents a single elevator in the simulation.
 *
 * @extends BaseClass
 */
class Elevator extends BaseClass {

	constructor( cfg ) {
		super( cfg );
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

		// State Variables
		me._isOccupied = false;
		me._enRoute = false;
		me._isDoorsOpen = false;
		me._currentFloor = 1;
		me._destinations = [];
		me._requiresMaintenance = false;
		me._id = 0;

		// Tracking
		me._totalTrips = 0;
		me._totalFloorsPassed = 0;
		me._totalSteps = 0;

		// Settings
		me._topFloor = 5;
		me._maxTripsBeforeMaintenance = 100;

	}

	// -- Public Accessors -----------------------------------------------------

	/**
	 * Stores whether or not this elevator is occupied.
	 *
	 * Important: The value for this variable is assumed based on pickup and
	 * drop-off patterns, and cannot be definitely relied upon as an indicator
	 * of actual occupancy.
	 *
	 * @returns {boolean}
	 */
	get isOccupied() {
		return this._isOccupied;
	}

	/**
	 * Stores the current floor that this elevator is on.
	 *
	 * @var {number}
	 * @default 1
	 * @access public
	 */
	get currentFloor() {
		return this._currentFloor;
	}

	/**
	 * Returns the highest floor that this elevator can travel to/from.
	 *
	 * @var {number}
	 * @default 5
	 * @access public
	 */
	get topFloor() {
		return this._topFloor;
	}

	/**
	 * Returns the total number of trips (one pickup + one drop-off) this
	 * elevator has performed since it was last serviced/maintenanced.
	 *
	 * @var {number}
	 * @default 0
	 * @access public
	 */
	get totalTrips() {
		return this._totalTrips;
	}

	/**
	 * Returns the total number of floors this elevator has moved to.
	 *
	 * Note: This counter is NOT reset by maintenance and tracks the lifetime
	 * count for the elevator.
	 *
	 * @var {number}
	 * @default 0
	 * @access public
	 */
	get totalFloorsPassed() {
		return this._totalFloorsPassed;
	}

	/**
	 * Returns whether or not this elevator is in need of regularly
	 * scheduled maintenance; this property will automatically return TRUE
	 * once the elevator has exceeded the maximum number of "trips",
	 * which is defined by the private property `._maxTripsBeforeMaintenance`.
	 *
	 * @var {boolean}
	 * @default FALSE
	 * @access public
	 */
	get requiresMaintenance() {
		
		let me = this;
		let trips = me.totalTrips;
		let maxTrips = me._maxTripsBeforeMaintenance;
		
		if( trips >= maxTrips ) {
			return true;
		} else {
			return false;
		}
		
	}

	/**
	 * Returns whether or not the doors for this elevator are currently open.
	 *
	 * @var {boolean}
	 * @default FALSE
	 * @access public
	 */
	get isDoorsOpen() {
		return this._isDoorsOpen;
	}

	/**
	 * Returns whether or not this elevator is currently en route.
	 *
	 * @var {boolean}
	 * @default FALSE
	 * @access public
	 */
	get enRoute() {
		return this._enRoute;
	}

	/**
	 * Returns the total number of steps processed by this elevator
	 * (the number of calls to the `#step()` method).
	 *
	 * @var {number?}
	 * @default 0
	 * @access public
	 */
	get totalSteps() {
		return this._totalSteps;
	}

	/**
	 * Returns the floor number of the next destination for this elevator
	 * or NULL if no destination is pending.
	 * @var {number?}
	 * @default NULL
	 * @access public
	 */
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

	/**
	 * Applies service/maintenance to the elevator; this should be called
	 * in response to the elevator automatically entering maintenance mode
	 * so that service can be restored.
	 *
	 * @access public
	 * @returns {void}
	 */
	applyMaintenance() {

		// Locals
		let me = this;

		// Reset the trip counter to take
		// this elevator out of maintenance.
		me._totalTrips = 0;

	}

	/**
	 * Because the simulation has rules that require the current location,
	 * destination, and active route of each elevator to be considered, we
	 * must be able to track movement over time.
	 *
	 * This method adds the concept of time, by way of abstract "steps", to the
	 * simulator.
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

				// If the elevator is occupied when it arrives
				// at a destination, we will assume that a "trip"
				// has just been completed and will increment
				// our trip counter.
				if( me.isOccupied ) {
					me.totalTrips++;					
				}

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

	/**
	 * Checks to see if the elevator will pass a particular floor while
	 * executing its current route.
	 *
	 * @access public
	 * @param {number} floor The floor number to check against the current route.
	 * @returns {boolean} TRUE if the elevator will pass the given floor or
	 *          FALSE otherwise.
	 */
	willPassFloor( floor ) {

		// Locals
		let me = this;
		
		// If we're not en route, we will not pass
		// any floors, and can always return false.
		if( me.enRoute === false ) {
			return false;
		}
		
		// Check to see if the target floor falls
		// within our current route..
		if( floor > this.currentFloor && floor <= me.nextDestination ) {
			return true;
		} else if( floor < me.currentFloor && floor >= me.nextDestination ) {
			return true;
		} else {
			return false;
		}

	}

	/**
	 * Returns the distance that this elevator would need to travel in order
	 * to get from it's current floor to the floor provided by the `floor`
	 * parameter.
	 *
	 * @param {number} floor The floor to determine the distance to/from.
	 * @returns {number}
	 */
	getDistanceToFloor( floor ) {

		let me = this;
		let distance = me.currentFloor - floor;

		if( distance < 0 ) {
			distance = distance * -1;
		}

		return distance;

	}

	/**
	 * Adds a new destination to the destination queue.
	 *
	 * @access private
	 * @throws an error if the destination is out-of-bounds (below ground or
	 *         above the top floor)
	 * @param {number} floor The new destination floor.
	 * @returns {void}
	 */
	_addDestination( floor ) {

		let me = this;

		// todo: destinations should be injected intelligently
		//       so that steps required can be minimized.

		// Apply constraints on the possible destinations..
		if( floor < 1 ) {

			// Enforces simulation rule #5
			throw new Error("Count not add a destination for floor #" + floor + "; elevators cannot receive instructions for floors beneath the ground floor (#1).");

		} else if( floor > me._topFloor ) {

			// Enforces simulation rule #4
			throw new Error("Count not add a destination for floor #" + floor + "; elevators cannot receive instructions for floors above the top floor (#" + me._topFloor + ").");

		}

		me.logEvent("Adding new destination: Floor #" + floor);
		me._destinations.push( floor );

	}

	/**
	 * Removes the current (next) destination; this method is called
	 * upon arrival at a destination. (see `#_openDoors`).
	 *
	 * @access private
	 * @returns {void}
	 */
	_removeDestination() {

		let me = this;
		if( me._destinations.length === 0 ) {
			return;
		} else {
			me._destinations.shift();
		}

	}

	/**
	 * Adds a "pick-up" instruction for the elevator. It is assumed
	 * that pick-up instructions will be provided via the "call elevator"
	 * panel, by passengers not yet on board the elevator.
	 *
	 * @access public
	 * @param {number} floor The floor to pick one or more passengers up at.
	 * @returns {void}
	 */
	addPickup( floor ) {

		// Locals
		let me = this;

		// Logging
		me.logEvent("Received pickup request on floor #" + floor);

		// We will refuse new pickup instructions if the elevator is in
		// maintenance mode, per sim requirement #8. Importantly, this
		// logic slightly deviates from the simulation requirements because
		// we want to avoid entering maintenance mode with passengers
		// currently on board.
		if( me.requiresMaintenance ) {
			me.logEvent("Warning! Pickup ignored; the elevator requires maintenance");
		} else {

			// Add the new destination to the queue..
			this._addDestination( floor );

		}

	}

	/**
	 * Adds a "drop-off" instruction for the elevator. It is assumed
	 * that drop-off instructions will be provided via the internal
	 * elevator panel, by passengers already on board.
	 *
	 * @access public
	 * @param {number} floor The floor to drop one or more passengers off at.
	 * @returns {void}
	 */
	addDropOff( floor ) {

		// Locals
		let me = this;

		// Logging
		me.logEvent("Received drop-off instruction at floor #" + floor);

		// Add the new destination to the queue..
		this._addDestination( floor );

	}

	/**
	 * Opens the elevator doors.
	 *
	 * @access private
	 * @returns {void}
	 */
	_openDoors() {
		let me = this;
		me.logEvent("Opening Doors");
		me._isDoorsOpen = true;

		// Each time the doors open we can remove
		// a destination (todo: consider & test if this is always true)
		me._removeDestination();

		// Determine if we're enroute
		if( me.nextDestination === null ) {
			me._enRoute = false;
			me._isOccupied = false;
			me.logEvent("Final Destination Reached (Idle)");
		}

	}

	/**
	 * Closes the elevator doors.
	 *
	 * @access private
	 * @returns {void}
	 */
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


	// -- Debugging / Logging --------------------------------------------------

	/**
	 * Adds a single log event.
	 *
	 * @access public
	 * @param {*} txt The value to log
	 * @returns {void}
	 */
	logEvent( txt ) {

		let me = this;
		let prefix;

		if( me._id === 0 ) {
			prefix = "lonely.elevator";
		} else {
			prefix = "elevator:" + me._id;
		}

		me._logEventWithPrefix( prefix, txt);


	}

}

module.exports = Elevator;