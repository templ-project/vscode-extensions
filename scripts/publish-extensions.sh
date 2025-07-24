#!/bin/bash

MARKETPLACE="$1"
PACKAGES_PATH="$2"
DIST_PATH="$3"

if [ "$MARKETPLACE" == "vscode" ]; then
  MARKETPLACE_NAME="VS Code Marketplace"
  MARKETPLACE_EMOJI="🟦"
else
  MARKETPLACE_NAME="Open VSX Registry"
  MARKETPLACE_EMOJI="🟨"
fi

echo "::group::🚀 Publishing to $MARKETPLACE_NAME"

PUBLISHED_COUNT=0
SKIPPED_COUNT=0

# Check if packages directory exists
if [ ! -d "$PACKAGES_PATH" ]; then
  echo "::error::📁 Packages directory not found: $PACKAGES_PATH"
  exit 1
fi

for extension_dir in "$PACKAGES_PATH"/*; do
  if [ -d "$extension_dir" ]; then
    EXTENSION_NAME=$(basename "$extension_dir")
    PACKAGE_PATH="$extension_dir/package.json"

    echo "::group::� Publishing $EXTENSION_NAME"

    # Read extension info from source package.json
    if ! PUBLISHER=$(jq -r '.publisher' "$PACKAGE_PATH" 2>/dev/null); then
      echo "::error::❌ Could not read publisher from $PACKAGE_PATH"
      echo "::endgroup::"
      continue
    fi
    if ! NAME=$(jq -r '.name' "$PACKAGE_PATH" 2>/dev/null); then
      echo "::error::❌ Could not read name from $PACKAGE_PATH"
      echo "::endgroup::"
      continue
    fi
    if ! VERSION=$(jq -r '.version' "$PACKAGE_PATH" 2>/dev/null); then
      echo "::error::❌ Could not read version from $PACKAGE_PATH"
      echo "::endgroup::"
      continue
    fi

    echo "📦 Extension: $PUBLISHER.$NAME v$VERSION"

    # Find VSIX file
    VSIX_FILE="$DIST_PATH/tpl-$MARKETPLACE-$EXTENSION_NAME-$VERSION.vsix"

    if [ ! -f "$VSIX_FILE" ]; then
      echo "::error::❌ Could not find VSIX file: $VSIX_FILE"
      echo "::error::📂 Available files in $DIST_PATH/:"
      ls -la "$DIST_PATH/" || echo "$DIST_PATH/ directory not found"
      ((SKIPPED_COUNT++))
    else
      echo "📁 Found VSIX file: $VSIX_FILE"
      # Publish to appropriate marketplace with --skip-duplicate
      echo "🚀 Publishing $PUBLISHER.$NAME v$VERSION to $MARKETPLACE_NAME..."
      if [ "$MARKETPLACE" == "vscode" ]; then
        vsce publish --packagePath "$VSIX_FILE" --skip-duplicate
      else
        ovsx publish "$VSIX_FILE" --skip-duplicate
      fi

      if [ $? -eq 0 ]; then
        echo "::notice::🎉 Successfully published/skipped $PUBLISHER.$NAME v$VERSION to $MARKETPLACE_NAME"
        ((PUBLISHED_COUNT++))
      else
        echo "::error::❌ Failed to publish $PUBLISHER.$NAME v$VERSION"
        ((SKIPPED_COUNT++))
      fi
    fi

    echo "::endgroup::"
  fi
done

echo "::endgroup::"

SUMMARY="$MARKETPLACE_EMOJI $MARKETPLACE_NAME Summary: $PUBLISHED_COUNT extensions processed, $SKIPPED_COUNT failed"
echo "::notice::📊 $SUMMARY"

# Set outputs
echo "published-count=$PUBLISHED_COUNT" >>$GITHUB_OUTPUT
echo "skipped-count=$SKIPPED_COUNT" >>$GITHUB_OUTPUT
echo "summary=$SUMMARY" >>$GITHUB_OUTPUT
