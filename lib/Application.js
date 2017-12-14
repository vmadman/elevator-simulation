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

	_initPropertyDefaults() {

		super._initPropertyDefaults();

		this._groundFloor 	= 1;
		this._topFloor 		= 2;
		this._elevatorCount = 1;

	}

	_configure( cfg ) {

		super._configure( cfg );

		if( cfg.topFloor !== undefined && cfg.topFloor !== null ) {
			this._topFloor = cfg.topFloor; 
		}
		if( cfg.elevatorCount !== undefined && cfg.elevatorCount !== null ) {
			this._elevatorCount = cfg.elevatorCount;
		}
		
		
	}
	
	_initElevatorController() {
		
		let me = this;
		
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
	
	createRequest( originFloor, destinationFloor ) {
		
		let me = this;
		let controller = me._initElevatorController();
		controller.createRequest( originFloor, destinationFloor );
		
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

		let me = this;
		let controller = me._initElevatorController();
		controller.step();
		
	}

}

module.exports = Application;