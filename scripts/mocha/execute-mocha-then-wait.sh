#!/bin/bash


# -
# This script is a simple extension of 'execute-mocha.sh'; all it does is add
# an infinite sleep/wait after the tests have run so that the script
# never terminates.  The point is to allow execution and source watching via
# PM2 for continuous testing during development.
#
# You should never need to run this script directly...
# -


# Include (source) local.sh ..
MY_SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

#source "$MY_SCRIPT_PATH/execute-mocha.sh"
"$MY_SCRIPT_PATH/execute-mocha.sh"

# Say something
printf "%-17s" " "
printf "\e[1;30m%s\e[m" "Tests complete; Waiting for source updates..."
printf "%-18s" " "
printf "\n"

# Blank Line
printf "\n"

# Now we wait ...
sleep infinity
