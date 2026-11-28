#!/bin/sh
# Copy the built site assets back into every mockup folder, so each index.html renders from file://.
# Usage: restore-assets.sh <dist>   where <dist> is the output of `bun run build` at f3ed12a.
set -eu
dist=${1:?usage: restore-assets.sh <dist dir of a build of f3ed12a>}
here=$(cd "$(dirname "$0")" && pwd)
for d in base 0-recommended 1-tight 2-split 3-motion 4-steps; do
  mkdir -p "$here/$d/_astro"
  cp "$dist"/_astro/* "$here/$d/_astro/"
  cp "$dist/favicon.svg" "$dist/apple-touch-icon.png" "$dist/og.png" "$here/$d/"
  # The fonts are linked as /_astro/...; from file:// they must be relative to the CSS file.
  for css in "$here/$d"/_astro/*.css; do
    sed 's#url(/_astro/#url(#g' "$css" > "$css.tmp" && mv "$css.tmp" "$css"
  done
done
echo "assets restored into 6 folders from $dist"
