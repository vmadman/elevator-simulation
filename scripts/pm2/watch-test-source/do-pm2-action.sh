#!/usr/bin/env bash

# ------------------------------------------------------------------------------
#
#    About Project Scripts:
#    This is one of many 'project scripts' that perform various actions on
#    the project.
#
#    Important Note: You cannot call this script directly; it must be executed
#    via one of the commands defined in package.json.
#
# ------------------------------------------------------------------------------
#
#    About this Script:
#    This script provides abbreviated shortcuts for various PM2 actions
#    and commands using the 'app-config.json' run configuration located
#    in the same directory as this script.
#
#    Script Arguments:
#    @script-arg $1 - <required> The PM2 action to perform; the value of
#                     of this argument can be any of the following:
#
#        "start"   - Adds the application specified in `app-config.json` to
#                    PM2 (if necessary) and then starts the application.
#
#        "stop"    - Stops the application specified in `app-config.json`.
#
#        "monitor" - Tails the log of the application specified in
#                    `app-config.json`.
#
#        "delete"  - Stops the application specified in `app-config.json` and
#                    removes it from PM2.
#
#        "reload"  - Stops and removes the application specified in
#                    `app-config.json` and then adds it back and starts it.
#                    (This is useful if app-config.json changes)
#
#        "restart" - Stops the application specified by `app-config.json`
#                    and then starts it up again.
#
#        "status"  - Displays the status of all PM2 applications.
#
#        "dump"    - Dumps the application config file.
#
# ------------------------------------------------------------------------------

# Resolve fundamental information about this script.
MY_SCRIPT_PATH="${BASH_SOURCE[0]}"
MY_SCRIPT_DIR="$( cd "$( dirname "$MY_SCRIPT_PATH" )" && pwd )"
PROJECT_ROOT_DIR="$( cd "$( dirname "$MY_SCRIPT_PATH" )/../../.." && pwd )"
PM2_COMMON_SCRIPT="$PROJECT_ROOT_DIR/scripts/common/_pm2_common.sh"

# Resolve basic app config info
PM2_TARGET_NAME=${MY_SCRIPT_DIR##*/}
PM2_CONFIG_PATH="$MY_SCRIPT_DIR/app-config.json"

# Defer to the PM2 commons...
source "$PM2_COMMON_SCRIPT"

