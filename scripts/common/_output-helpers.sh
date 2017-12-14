#!/bin/bash

# Output Formatting Helpers

display_blank_line() {
    echo " "
}

display_black_line() {

    # line width = 120
    printf "\e[1;40m%-120s\e[m\n" ""

}

display_variable() {

    # Resolve function arguments
    DV_NAME="$1"
    DV_VALUE="$2"

    # Indent
    printf "\e[1;40m%-4s\e[m" " "
    printf "\e[0;40m%-2s\e[m" "$"

    # Variable Name
    printf '\e[1;31;40m%-18s\e[m' "$DV_NAME"

    # Colon
    printf '\e[0;40m%-2s\e[m' ":"

    # Variable Value
    printf '\e[0;40m%-94s\e[m\n' "$DV_VALUE"

    # line width = 120
    # 4 + 2 + 18 + 2 + ( 54 ) = 80 (old)
    # 54 + 40 = 94 -> 120          (new)

}

display_padding_lines() {
    display_blank_line
    display_blank_line
    display_blank_line
}

show_error() {

    display_blank_line
    display_blank_line
    echo "        Error:"
    echo "        $1"
    display_blank_line
    display_blank_line

}