#!/bin/bash

# Ask for project name
read -p "Enter your Vite project name: " projectName

# Create app using React + JavaScript template (no prompts)
npm create vite@latest "$projectName" -- --template react

# Enter project directory
cd "$projectName" || { echo "❌ Failed to cd into $projectName"; exit 1; }

# Install dependencies
npm install

# Start dev server
npm run dev
