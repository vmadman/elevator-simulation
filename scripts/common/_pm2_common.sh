#!/usr/bin/env bash

# Prevent direct execution of this script (require 'npm run')
if [ -z "$npm_lifecycle_event" ]; then
    echo -e "\n\n\n\n"
    echo "[Error] You cannot run this script directly, you must execute this"
    echo "script using the appropriate command listed in package.json via 'npm run'."
    echo -e "\n\n\n\n"
    exit 1
fi

# --

# Define helper functions

show_usage_instructions() {

    echo " "
    echo "    usage: npm run $npm_lifecycle_event [action]"
    echo " "
    echo "    Valid Actions: start (default), stop, monitor, delete, reload, restart, status, dump"

}

show_pm2_app_variables() {

    echo " "
    echo "        $ Application Name  : $PM2_TARGET_NAME"
    echo "        $ Config Path       : $PM2_CONFIG_PATH"
    echo "        $ Working Directory : $PROJECT_ROOT_DIR"
    echo " "

}

show_div_line() {
    echo "-------------------------------------------------------------------------------------------------------------------------------------"
}

show_script_header() {

    echo " "
    show_div_line
    echo " "
    echo " "

}

show_script_footer() {

    echo " "
    show_div_line
    echo " "
    echo " "

}

pm2_cmd_start() {

    show_script_header
    echo "    Telling PM2 to start the application ..."
    show_pm2_app_variables
    show_script_footer

    # --

    cd "$PROJECT_ROOT_DIR"
    pm2 start "$PM2_CONFIG_PATH"

}

pm2_cmd_stop() {

    show_script_header
    echo "    Telling PM2 to stop the application ..."
    show_pm2_app_variables
    show_script_footer

    # --

    cd "$PROJECT_ROOT_DIR"
    pm2 stop "$PM2_CONFIG_PATH"

}

pm2_cmd_monitor() {

    show_script_header
    echo "    Tailing application logs ..."
    show_pm2_app_variables
    show_script_footer

    # --

    cd "$PROJECT_ROOT_DIR"
    pm2 logs "$PM2_TARGET_NAME" --raw

}

pm2_cmd_delete() {

    show_script_header
    echo "    Removing the application from PM2 ..."
    show_pm2_app_variables
    show_script_footer

    # --

    cd "$PROJECT_ROOT_DIR"
    pm2 delete "$PM2_CONFIG_PATH"

}

pm2_cmd_reload() {

    show_script_header
    echo "    Reloading the application config in PM2 ..."
    show_pm2_app_variables
    show_script_footer

    # --

    cd "$PROJECT_ROOT_DIR"
    pm2 delete "$PM2_CONFIG_PATH"
    echo " "
    pm2 start "$PM2_CONFIG_PATH"

}

pm2_cmd_restart() {

    show_script_header
    echo "    Telling PM2 to restart the application ..."
    show_pm2_app_variables
    show_script_footer

    # --

    cd "$PROJECT_ROOT_DIR"
    pm2 restart "$PM2_CONFIG_PATH"

}

pm2_cmd_status() {

    show_script_header
    echo "    Displaying PM2 status ..."
    show_pm2_app_variables
    show_script_footer

    # --

    pm2 status

}

pm2_cmd_show_config() {

    show_script_header
    echo "    Dumping the application config file ..."
    show_pm2_app_variables
    show_script_footer

    # --

    cat "$PM2_CONFIG_PATH"

    echo " "
    echo " "
    echo " "
    show_div_line
    echo " "

}

# --

# Param validation
if [ -z "$1" ]; then

    PM2_ACTION="start"

else

    PM2_ACTION="$1"

fi

# --

# Evaluate the first param/action and execute
# the appropriate helper function.

if [ "$PM2_ACTION" == "start" ]; then

    pm2_cmd_start

elif [ "$PM2_ACTION" == "stop" ]; then

    pm2_cmd_stop

elif [ "$PM2_ACTION" == "monitor" ]; then

    pm2_cmd_monitor

elif [ "$PM2_ACTION" == "delete" ]; then

    pm2_cmd_delete

elif [ "$PM2_ACTION" == "reload" ]; then

    pm2_cmd_reload

elif [ "$PM2_ACTION" == "restart" ]; then

    pm2_cmd_restart

elif [ "$PM2_ACTION" == "status" ]; then

    pm2_cmd_status

elif [ "$PM2_ACTION" == "dump" ]; then

    pm2_cmd_show_config

else

    echo -e "\n\n\n\n"
    echo "[Error] Invalid/unrecognized 'action' parameter (param 1): '$PM2_ACTION'"

    show_usage_instructions

    echo -e "\n\n\n\n"
    exit 0

fi

# --

# Some extra output at the end of the script
echo -e "\n\n"
