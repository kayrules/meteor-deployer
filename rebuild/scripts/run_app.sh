#!/bin/bash
set -e

if [ -d /bundle ]; then
    cd /bundle
    tar xzf *.tar.gz
    cd /bundle/bundle/programs/server/
    npm i
    cd /bundle/bundle/programs/server/npm/node_modules/meteor/npm-bcrypt/
    rm -r node_modules
    npm install bcrypt
    mkdir node_modules
    mv ../../bcrypt node_modules/
    cd /bundle/bundle/
else
    echo "=> You don't have any meteor app to run in this image."
    exit 1
fi

# Set a delay to wait to start meteor container
if [[ $DELAY ]]; then
    echo "Delaying startup for $DELAY seconds"
    sleep $DELAY
fi

# Honour already existing PORT setup
export PORT=${PORT:-80}

echo "=> Starting meteor app on port:$PORT"
node main.js
