#!/bin/bash
export NODE_ENV=production

languages=$(jq -r '.supportedLocales | join(" ")' ./package.json)
languages_pattern=$(jq -r '.supportedLocales | join("|")' ./package.json)

echo "Building intl..."

../../scripts/formatjs-extract.js '../../!(node_modules)/!(intl)/src/**/*.js*' ./lang/messages.json

for lang in $languages
do
    if [ -f ./lang/$lang.json ]; then
        json2po --filter="defaultMessage" ./lang/$lang.json ./lang/$lang.po
    else
        json2po --filter="defaultMessage" ./lang/messages.json ./lang/$lang.po
    fi
    po2json -t ./lang/messages.json ./lang/$lang.po ./lang/$lang.json
done

../../scripts/formatjs-compile.js './lang/+(${languages_pattern}).json' ./locale
