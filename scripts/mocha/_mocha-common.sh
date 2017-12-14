#!/bin/bash

# Some basic/common variables for Mocha execution
SERVICE_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/../.." && pwd )"
NODE_BIN_PATH="$(which node)"
MOCHA_EXEC_CWD="$SERVICE_ROOT/lib"

MOCHA_REL_PATH="node_modules/mocha/bin"
MOCHA_PATH="$SERVICE_ROOT/$MOCHA_REL_PATH"

MOCHA_SCRIPT_NAME="mocha"
MOCHA_EXECUTABLE="$MOCHA_PATH/$MOCHA_SCRIPT_NAME"

# Other, basic, variables
MOCHA_DEFAULT_TIMEOUT="5000"
MOCHA_SLOW_THRESHOLD="300"

MOCHA_AR_REL_PATH="test/_globals.js"
MOCHA_AUTO_REQUIRE="$SERVICE_ROOT/$MOCHA_AR_REL_PATH"

# This Mocha glob pattern includes ...
#   - Every JS file in project/test
# Except for ...
#   - Files in test/lib, and
#   - Files prefixed with an underscore.
MOCHA_TEST_PATH="../test/!(_)*.js"


# Helper to show Mocha execution variables
display_mocha_variables() {

    # Padding
    display_black_line

    # The Variables ...
    display_variable "Node Binary" "$NODE_BIN_PATH"
    display_variable "Mocha Executable" "./$MOCHA_REL_PATH/$MOCHA_SCRIPT_NAME"
    display_variable "Mocha CWD" "$MOCHA_EXEC_CWD"
    display_variable "Test Pattern" "$MOCHA_TEST_PATH"
    display_variable "Default Timeout" "$MOCHA_DEFAULT_TIMEOUT""ms"
    display_variable "Slow Threshold" "$MOCHA_SLOW_THRESHOLD""ms"
    display_variable "Auto Require" "./$MOCHA_AR_REL_PATH"

    # More Padding
    display_black_line

}

# Helper to run Mocha
run_mocha() {

    # These variables will be available to the Mocha unit tests..

    # Basic..
    export NODE_ENV="development"

    # This variable is available to the tests
    # and instructs the tests on what type of
    # testing that they should do.
    export ENDPOINT_TEST_TARGET="$1"

    # These are for use within 'mocha-endpoint-test-helper.js'
    export ENDPOINT_PROJECT_PATH="$SERVICE_ROOT"

    # Move to CWD
    cd "$MOCHA_EXEC_CWD"

    # Execute Mocha
    "$NODE_BIN_PATH" "$MOCHA_EXECUTABLE" \
        --recursive \
        --colors \
        --check-leaks \
        --bail \
        --slow "$MOCHA_SLOW_THRESHOLD" \
        --timeout "$MOCHA_DEFAULT_TIMEOUT" \
        --require "$MOCHA_AUTO_REQUIRE" \
        "$MOCHA_TEST_PATH"

    LAST_MOCHA_EXIT_CODE=$?

}