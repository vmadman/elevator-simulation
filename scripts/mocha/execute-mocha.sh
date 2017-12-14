#!/bin/bash

# This script will execute the local unit tests for this project.

# Resolve a few paths ..
MY_SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Include some commons/helpers ..
source "$MY_SCRIPT_PATH/../common/_output-helpers.sh"
source "$MY_SCRIPT_PATH/_mocha-common.sh"

# ---

# Pad the output
display_padding_lines

# Heading
display_black_line
printf "\e[1;40m%-46s\e[m" " "
printf "\e[1;40m%s\e[m" "Running Local Endpoint Tests"
printf "\e[1;40m%-46s\e[m" " "
printf "\n"

# line width = 120
# Running Local Endpoint Tests <- len = 28
# ( 26 + 26 ) + 28 = 80  (old)
# ( 46 + 46 ) + 28 = 120 (new)


# Show Mocha Variables
display_mocha_variables

# Padding
display_blank_line

# ---

# Run Mocha
run_mocha "local"

# ---

# Padding
display_padding_lines

if [ $LAST_MOCHA_EXIT_CODE -ne 0 ]; then
    exit "$LAST_MOCHA_EXIT_CODE"
fi

