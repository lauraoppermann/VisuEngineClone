#!/bin/bash

# Check user
if [ $(whoami) != "root" ]
then
echo "Run as root!"
exit
fi

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
rm -Rf ./src/pluginmanager/plugins/*

echo "Delete existing units"
rm -Rf ./src/renderer/units/*

echo "Move plugin folder and unit folder to project root"
mv ./src/pluginmanager/plugins ./
mv ./src/renderer/units ./

# Modify Constants
echo "Rewrite Constants"
cat ./src/Constants.js| sed "s/renderer\/units\//units\//" | sed "s/pluginmanager\/plugins/plugins\//" | sed "s/[1]/[0]/" > ./src/Constants.js.rewrite

echo "Replace Constants.js and backup old version"
mv ./src/Constants.js ./src/Constants.js.old
mv ./src/Constants.js.rewrite ./src/Constants.js

# Build Binary
echo "Build binary"
mkdir bin
pkg ./src -o ./bin
