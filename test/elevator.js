const ele = require("../lib/Elevator.js");
const expect 	= require("chai").expect;

describe.only("Elevator", function() {

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

		});

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


	});

});
