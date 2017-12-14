elevator-simulation
==========================================

An elevator simulation; I wrote this proof-of-concept application
in response to a programming challenge.

The code within is _mostly_ complete and _almost_ runs, but it still
requires some debugging and work before it could actually function.

All source code can be found within `./lib` and preliminary tests
can be found in `./test` (Mocha).

```
  ElevatorController
    Initialization
      - should something..
  Elevator
    Initialization
      ✓ should initialize with sane defaults
    Basic Functionality
      ✓ should count steps
      ✓ should allow multiple steps to be taken in one call
      ✓ should not move without instructions
      ✓ should open its doors if a pickup is requested on current floor
      ✓ should always spend a step closing its doors
      ✓ should idle if drop-off instructions are not given
[lonely.elevator] Received pickup request on floor #1
[lonely.elevator] Adding new destination: Floor #1
[lonely.elevator] ... upcoming destinations: 1
[lonely.elevator] ... upcoming destinations: 1
[lonely.elevator] At Destination (Floor #1)
[lonely.elevator] Opening Doors
[lonely.elevator] Final Destination Reached (Idle)
[lonely.elevator] Closing Doors
[lonely.elevator] Awaiting dropoff instructions...
[lonely.elevator] Received drop-off instruction at floor #3
[lonely.elevator] Adding new destination: Floor #3
[lonely.elevator] ... upcoming destinations: 3
[lonely.elevator] ... upcoming destinations: 3
[lonely.elevator] Moving up toward destination
[lonely.elevator] ... current    : 2
[lonely.elevator] ... destination: 3
[lonely.elevator] ... upcoming destinations: 3
[lonely.elevator] Moving up toward destination
[lonely.elevator] ... current    : 3
[lonely.elevator] ... destination: 3
[lonely.elevator] Received pickup request on floor #2
[lonely.elevator] Adding new destination: Floor #2
[lonely.elevator] ... upcoming destinations: 3, 2
[lonely.elevator] ... upcoming destinations: 3, 2
[lonely.elevator] At Destination (Floor #3)
[lonely.elevator] Opening Doors
[lonely.elevator] ... upcoming destinations: 2
[lonely.elevator] ... upcoming destinations: 2
[lonely.elevator] Closing Doors
[lonely.elevator] ... upcoming destinations: 2
[lonely.elevator] Enroute...
[lonely.elevator] Received drop-off instruction at floor #1
[lonely.elevator] Adding new destination: Floor #1
[lonely.elevator] ... upcoming destinations: 2, 1
[lonely.elevator] ... upcoming destinations: 2, 1
[lonely.elevator] Moving down toward destination
[lonely.elevator] ... current    : 2
[lonely.elevator] ... destination: 2
[lonely.elevator] ... upcoming destinations: 2, 1
[lonely.elevator] At Destination (Floor #2)
[lonely.elevator] Opening Doors
[lonely.elevator] ... upcoming destinations: 1
[lonely.elevator] ... upcoming destinations: 1
[lonely.elevator] Closing Doors
[lonely.elevator] ... upcoming destinations: 1
[lonely.elevator] Enroute...
[lonely.elevator] ... upcoming destinations: 1
[lonely.elevator] Moving down toward destination
[lonely.elevator] ... current    : 1
[lonely.elevator] ... destination: 1
[lonely.elevator] ... upcoming destinations: 1
[lonely.elevator] At Destination (Floor #1)
[lonely.elevator] Opening Doors
[lonely.elevator] Final Destination Reached (Idle)
      ✓ should do more..
  8 passing (16ms)
  1 pending
```
