#!/bin/bash

export NODE_ENV=production

# Clean
echo "Cleaning..."
rm -rf assets
rm -rf lib
rm -rf es

# Build
echo "Building JS..."
if [ -f ./rollup.config.js ]; then
    ../../node_modules/.bin/rollup --config ./rollup.config.js
else
    ../../node_modules/.bin/rollup --config ../../rollup.config.js
fi

# CSS
if [ -f ./es/styles.css ]; then
    echo "Building css..."
    mkdir -p ./assets/css/
    cp es/styles.css ./assets/css/styles.css
    rm -f es/styles.css
    rm -f lib/styles.css
fi

# Intl
if grep -q "lang" "package.json"; then
    echo "Building intl..."
    mkdir -p ./lang/extract/
    ../../scripts/formatjs-extract.js './src/**/*.js*' ./lang/extract/en.json
    tx push -s
    tx pull -a
    ../../scripts/formatjs-compile.js './lang/extract/*.json' ./lang
fi
