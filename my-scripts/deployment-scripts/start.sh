#!/bin/bash

# Run sequelize migrations and seeds
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:seed:all

# Start the Node.js application
npm start
