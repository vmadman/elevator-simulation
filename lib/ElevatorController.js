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
 * A controller for routing multiple elevators within a simulation.
 *
 * @extends BaseClass
 */
class ElevatorController extends BaseClass {

	constructor( cfg ) {
		super( cfg );
		this._initElevators();
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

		// Param coercion
		if( count === null || count === undefined ) {
			count = 1;
		}

		// Defer to the elevators
		_.each( me._elevators, function( elevator ) {
			elevator.step( count );
		});

	}

	/**
	 * Initializes the internal elevator collection.
	 *
	 * @access private
	 * @returns {void}
	 */
	_initElevators() {

		let me = this;
		let count = me._elevatorCount;
		for( let i = 1; i<=count; i++ ) {

			let elevator = new Elevator({
				id: i,
				topFloor: me._topFloor
			});
			me._elevators.push( elevator );

		}

	}

	/**
	 * Adds a "pick-up" instruction, which will be routed to the elevator
	 * that best-aligns with the priority rules (outlined in sim requirement #7)
	 *
	 * Important Note: The elevator controller only routes "pick-up" requests,
	 * and leaves drop-off routing to each elevator.
	 *
	 * @access public
	 * @param {number} floor The floor to pick one or more passengers up at.
	 * @returns {void}
	 */
	addPickup( floor ) {

		// Locals
		let me = this;

		// Find the best, available, elevator..
		let elevator = me._findBestElevatorForPickup( floor );

		// Route..
		elevator.addPickup( floor );

	}

	/**
	 * Finds the best elevator for completing a pick-up request.
	 * (In accordance with sim requirement #7)
	 *
	 * @throws an Error if no available/valid elevators could be found.
	 * @param {number} floor The floor in which one or more passengers will be
	 *        picked up.
	 * @returns {Elevator} The elevator that should be used to complete the
	 *          pick-up request.
	 */
	_findBestElevatorForPickup( floor ) {

		let me = this;
		let result = null;
		let shortestDistance = null;
		let closestElevator = null;

		_.each( me.elevators, function( elevator ) {

			// 1. Exclude elevators that require maintenance
			if( elevator.requiresMaintenance ) {
				return true;
			}

			// 2. If this elevator is currently unoccupied and
			// on the target floor, then it will be used..
			if( elevator.isOccupied === false && elevator.currentFloor === floor ) {
				result = elevator;
				return false; // <-- stop searching (per lodash)
			}

			// 3. If this elevator is en route and will pass our target floor,
			// and none of the above rules have matched, then we will use this
			// elevator.
			if( elevator.willPassFloor( floor ) ) {
				result = elevator;
				return false; // <-- stop searching (per lodash)
			}

			// 4. If the above rules do not match, we will find and store
			// the elevator that is the closest..
			let distance = elevator.getDistanceToFloor( floor );
			if( shortestDistance === null || distance < shortestDistance ) {
				shortestDistance = distance;
				closestElevator = elevator;
			}

			// .. keep searching ..

		});

		// Return any high-priority matches..
		if( result !== null ) {
			return result;
		}

		// Return the closest elevator..
		if( closestElevator !== null ) {
			return closestElevator;
		}

		// Error if no elevator could be found..
		throw new Error("Could not find a valid elevator to complete the pick-up request!");

	}


}

module.exports = ElevatorController;