#!/bin/bash

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start TypeScript compiler in watch mode in the background
echo "Starting TypeScript compiler in watch mode..."
npm run watch &
WATCH_PID=$!

# Start the development server
echo "Starting development server..."
npm run dev

# When the server is stopped, also stop the TypeScript compiler
kill $WATCH_PID 