#!/bin/bash

set -Eeuo pipefail

# Configures npm trusted publishing for every public package, so they can be
# published by the .github/workflows/publish.yml workflow, from its `npm`
# environment, without an npm token.
#
# Requires npm 11.15.0 or above, `npm login` with an account that has write
# access to the packages and 2FA enabled. A token that bypasses 2FA (ex.: a
# granular access token in ~/.npmrc) is refused with a 401: run
# `npm login --auth-type=web` first. On the 2FA prompt, enable the option to
# skip 2FA for 5 minutes: the whole run takes a bit longer, so expect a second
# prompt.
#
# A package that already has a trusted publisher answers 409 Conflict: it is
# reported as already configured, not as a failure.
#
# Usage: ./scripts/npm-trust.sh [--dry-run]

repository="urbania-media/micromag-js"
workflow="publish.yml"
# The job that publishes runs in this environment (Settings → Environments)
environment="npm"

cd "$(dirname "$0")/.."

packages=$(npx lerna ls --json --loglevel silent | node -e "
    let input = '';
    process.stdin.on('data', (data) => (input += data));
    process.stdin.on('end', () => JSON.parse(input).forEach(({ name }) => console.log(name)));
")

errors=$(mktemp)
trap 'rm -f "$errors"' EXIT

configured=()
existing=()
failed=()
for package in $packages; do
    echo "Configuring $package..."
    # Only stderr goes through tee (to find the error code): stdout stays on the
    # terminal for the 2FA prompt, and the pipeline ends once tee is done
    if { npm trust github "$package" \
        --file "$workflow" \
        --repository "$repository" \
        --environment "$environment" \
        --allow-publish \
        --yes \
        "$@" 2>&1 1>&3 | tee "$errors" >&2; } 3>&1; then
        configured+=("$package")
    elif grep -q 'code E409' "$errors"; then
        # 409 Conflict: the package already has a trusted publisher
        echo "$package already has a trusted publisher."
        existing+=("$package")
    else
        failed+=("$package")
    fi
    # Avoid the registry rate limiting
    sleep 2
done

echo
echo "Configured: ${#configured[@]} package(s)"
echo "Already configured: ${#existing[@]} package(s)"
if [ ${#existing[@]} -gt 0 ]; then
    echo "To check or replace an existing configuration: npm trust list <package>, then npm trust revoke."
fi

if [ ${#failed[@]} -gt 0 ]; then
    echo "Failed to configure ${#failed[@]} package(s):"
    printf '  - %s\n' "${failed[@]}"
    exit 1
fi

echo "All packages are configured."
