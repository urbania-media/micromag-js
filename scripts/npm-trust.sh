#!/bin/bash

set -Eeuo pipefail

# Configures npm trusted publishing for every public package, so they can be
# published by the .github/workflows/publish.yml workflow without an npm token.
#
# Requires npm 11.15.0 or above, `npm login` with an account that has write
# access to the packages and 2FA enabled. On the first 2FA prompt, enable the
# option to skip 2FA for 5 minutes, which is enough for about 80 packages.
#
# Usage: ./scripts/npm-trust.sh [--dry-run]

repository="urbania-media/micromag-js"
workflow="publish.yml"

cd "$(dirname "$0")/.."

packages=$(npx lerna ls --json --loglevel silent | node -e "
    let input = '';
    process.stdin.on('data', (data) => (input += data));
    process.stdin.on('end', () => JSON.parse(input).forEach(({ name }) => console.log(name)));
")

failed=()
for package in $packages; do
    echo "Configuring $package..."
    if ! npm trust github "$package" \
        --file "$workflow" \
        --repository "$repository" \
        --allow-publish \
        --yes \
        "$@"; then
        failed+=("$package")
    fi
    # Avoid the registry rate limiting
    sleep 2
done

if [ ${#failed[@]} -gt 0 ]; then
    echo "Failed to configure ${#failed[@]} package(s):"
    printf '  - %s\n' "${failed[@]}"
    echo "A package already configured must be revoked first (npm trust list, then npm trust revoke)."
    exit 1
fi

echo "All packages are configured."
