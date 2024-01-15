#/bin/bash

#https://github.com/unegma/bash-functions/blob/main/update.sh
CURRENT_VERSION=$(git describe --abbrev=0 --tags 2>/dev/null)

if [[ $CURRENT_VERSION == '' ]]; then
    CURRENT_VERSION='1.0.0'
fi
echo "Current Version: $CURRENT_VERSION"

#replace . with space so can split into an array
CURRENT_VERSION_PARTS=(${CURRENT_VERSION//./ })

#get number parts
VNUM1=${CURRENT_VERSION_PARTS[0]}
VNUM2=${CURRENT_VERSION_PARTS[1]}
VNUM3=${CURRENT_VERSION_PARTS[2]}

VNUM3=$((VNUM3 + 1))

NEW_TAG="$VNUM1.$VNUM2.$VNUM3"
echo "($VERSION) updating $CURRENT_VERSION to $NEW_TAG"

#get current hash and see if it already has a tag
GIT_COMMIT=$(git rev-parse HEAD)
NEEDS_TAG=$(git describe --contains $GIT_COMMIT 2>/dev/null)

#only tag if no tag already
if [ -z "$NEEDS_TAG" ]; then
    echo "Tagged with $NEW_TAG"
    git tag "$NEW_TAG"
    git push --tags
    git push
else
    echo "Already a tag on this commit"
fi