#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Compile TypeScript
echo "Compiling TypeScript..."
npm run build

# Start the server
echo "Starting server..."
npm start 