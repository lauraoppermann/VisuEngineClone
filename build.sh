#!/bin/bash

# Check requirements
NPM=$(which npm)
PKG=$(which pkg)

if [ -z $NPM ]
then
echo "You have to install npm"
exit
fi

if [ -z $PKG ]
then
echo "You have to install pkg globally using npm"
exit
fi


# Prepare Project
echo "Delete existing plugins"
mkdir ./bin
mkdir ./bin/plugins
mkdir ./bin/units

# Modify Constants
echo "Rewrite Constants"
cat ./src/Constants.js| sed "s/renderer\/units\//units\//" | sed "s/pluginmanager\/plugins/plugins\//" | sed "s/[1]/[0]/" > ./src/Constants.js.rewrite

echo "Replace Constants.js and backup old version"
mv ./src/Constants.js ./src/Constants.js.old
mv ./src/Constants.js.rewrite ./src/Constants.js

# Build Binary
echo "Build binary"
pkg ./src -o ./bin/visuengine

# Restore Constants
echo "Restoring Constants.js..."
mv ./src/Constants.js.old ./src/Constants.js
echo "Done!"

# Done
echo "Build successfully"
