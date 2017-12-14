const ele = require("../lib/Elevator.js");
const expect 	= require("chai").expect;

describe("Elevator", function() {

	describe("Initialization", function() {

		let elevator;

		beforeEach(
			function() {

				elevator = new ele();

			}
		);

		it("should initialize with sane defaults", function() {

			expect( elevator.currentFloor ).to.equal( 1 );
			expect( elevator.topFloor ).to.equal( 5 );
			expect( elevator.isOccupied ).to.equal( false );
			expect( elevator.enRoute ).to.equal( false );
			expect( elevator.totalTrips ).to.equal( 0 );
			expect( elevator.totalFloorsPassed ).to.equal( 0 );
			expect( elevator.requiresMaintenance ).to.equal( false );
			expect( elevator.isDoorsOpen ).to.equal( false );
			expect( elevator.totalSteps ).to.equal( 0 );

			// Private Variables
			expect( elevator._loggingEnabled ).to.equal( false );

		});


	});

	describe("Basic Functionality", function() {

		let elevator;

		beforeEach(
			function() {

				elevator = new ele();

			}
		);

		it("should count steps", function() {

			elevator.step();
			expect( elevator.totalSteps ).to.equal( 1 );

		});

		it("should allow multiple steps to be taken in one call", function() {

			elevator.step( 5 );
			elevator.step( 5 );
			expect( elevator.totalSteps ).to.equal( 10 );

		});

		it("should not move without instructions", function() {

			elevator.step( 5 );
			expect( elevator.currentFloor ).to.equal( 1 );

		});

		it("should open its doors if a pickup is requested on current floor", function() {

			elevator.addPickup( 1 );
			elevator.step();

			expect( elevator.currentFloor ).to.equal( 1 );
			expect( elevator.isDoorsOpen ).to.equal( true );

		});

		it("should always spend a step closing its doors", function() {

			elevator.addPickup( 1 );
			elevator.step( 2 );

			expect( elevator.currentFloor ).to.equal( 1 );
			expect( elevator.isDoorsOpen ).to.equal( false );

		});

		it("should idle if drop-off instructions are not given", function() {

			elevator.addPickup( 1 );
			elevator.step( 2 );

			expect( elevator.enRoute ).to.equal( false );

		});

		it.skip("should do more..", function() {

			elevator.enableLogging();

			elevator.addPickup( 1 );
			elevator.step( 2 );
			elevator.addDropOff( 3 );
			elevator.step( 2 );
			elevator.addPickup( 2 );
			elevator.step( 2 );
			elevator.addDropOff( 1 );
			elevator.step( 5 );

			// I stopped adding tests here for the sake of time, and
			// because the challenge instructions did not require the
			// simulation to actually run...

			// Had this been a real project, I would have written dozens
			// of tests before continuing to add logic...
			// #tdd4life
			// see: https://www.kuali.co/100-code-coverage-bare-minimum/

		});


	});

});
