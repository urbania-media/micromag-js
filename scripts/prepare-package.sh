#!/bin/bash

# Help
usage() {
    echo "Usage: $0"
}

# Transform long options to short ones
for arg in "$@"; do
    shift
    case "$arg" in
        "--help") set -- "$@" "-h" ;;
        *)        set -- "$@" "$arg"
    esac
done

# Set defaults
languages="en fr"

# Get options
while getopts '?h' c
do
    case $c in
        h) usage; exit 0 ;;
        ?) usage >&2; exit 1 ;;
    esac
done

# Build methods
clean() {
    echo "Cleaning..."
    rm -rf assets
    rm -rf lib
    rm -rf es
}

build_rollup() {
    echo "Building JS with rollup..."
    if [ -f ./rollup.config.js ]; then
        mkdir ./es
        ../../node_modules/.bin/rollup --config ./rollup.config.js --bundleConfigAsCjs
    else
        mkdir ./lib
        ../../node_modules/.bin/rollup --config ../../rollup.config.js --bundleConfigAsCjs
    fi
}

copy_css() {
    echo "Copying css..."
    mkdir -p ./assets/css/
    cp es/styles.css ./assets/css/styles.css
    rm -f es/styles.css
    rm -f lib/styles.css
}

copy_styles() {
    echo "Copying styles..."
    mkdir -p ./styles/
    find ./src/styles -type f \( -name "*.css" -o -name "*.module.css" \) -exec cp {} ./styles/ \;
}

# Build
export NODE_ENV=production
clean
build_rollup
if [ -f ./es/styles.css ]; then copy_css; fi
if [ -d ./src/styles ] && ls ./src/styles/*.css 1>/dev/null 2>&1; then copy_styles; fi
