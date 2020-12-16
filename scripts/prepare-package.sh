#!/bin/bash

# Help
usage() {
    echo "Usage: $0 [--scss|-s] [--intl|-i]"
}

# Transform long options to short ones
for arg in "$@"; do
    shift
    case "$arg" in
        "--help") set -- "$@" "-h" ;;
        "--scss") set -- "$@" "-s" ;;
        "--intl") set -- "$@" "-i" ;;
        *)        set -- "$@" "$arg"
    esac
done

# Set defaults
scss=false
intl=false
languages="en fr"

# Get options
while getopts 'is?h' c
do
    case $c in
        s) scss=true ;;
        i) intl=true ;;
        h) usage; exit 0 ;;
        ?) usage >&2; exit 1 ;;
    esac
done

# Build methods
clean() {
    echo "Cleaning..."
    rm -rf scss
    rm -rf assets
    rm -rf lib
    rm -rf es
}

build_rollup() {
    echo "Building JS with rollup..."
    if [ -f ./rollup.config.js ]; then
        ../../node_modules/.bin/rollup --config ./rollup.config.js
    else
        ../../node_modules/.bin/rollup --config ../../rollup.config.js
    fi
}

copy_css() {
    echo "Copying css..."
    mkdir -p ./assets/css/
    cp es/styles.css ./assets/css/styles.css
    rm -f es/styles.css
    rm -f lib/styles.css
}

copy_scss() {
    echo "Copying scss..."
    mkdir -p ./scss/
    find ./src -type f -name "*.scss" ! -name "*.module.scss" -exec cp {} ./scss/ \;
}

build_intl() {
    echo "Building intl..."

    ../../scripts/formatjs-extract.js './src/**/*.js*' ./lang/messages.json

    for lang in $languages
    do
        if [ -f ./lang/$lang.json ]; then
            json2po -t ./lang/messages.json --filter=defaultMessage ./lang/$lang.json ./lang/$lang.po
        else
            json2po --filter=defaultMessage ./lang/messages.json ./lang/$lang.po
        fi
        po2json -t ./lang/messages.json ./lang/$lang.po ./lang/$lang.json
    done

    ../../scripts/formatjs-compile.js './lang/*.json' ./lang

    # for lang in $languages
    # do
    #     if [ -f ./lang/$lang.json ]; then
    #         ../../scripts/json2po.py -t ./lang/messages.json ./lang/$lang.json ./lang/$lang.po
    #     else
    #         ../../scripts/json2po.py ./lang/messages.json ./lang/$lang.po
    #     fi
    #     python3 ../../scripts/po2json.py -t ./lang/messages.json ./lang/$lang.po ./lang/$lang.json
    # done
    #
    # ../../scripts/formatjs-compile.js './lang/*.json' ./lang
}

# Build
export NODE_ENV=production
clean
build_rollup
if [ -f ./es/styles.css ]; then copy_css; fi
if [ "$scss" = true ]; then copy_scss; fi
if [ "$intl" = true ]; then build_intl; fi
