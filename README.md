# BikeApp

This is a pre-assignment for Solita Dev Academy Finland 2023. Made by Lauri Ahola.

## Table of Contents

- [Project Description](#project-description)
- [Stack](#stack)
- [Features](#features)
- [Run project](#run-project)
- [Next](#next)

## Project Description 

Provide a more detailed overview of your project. Describe what it does, why it's useful, and any other important details.

## Used Stack

The project relies on the following technologies:

- **Node.js**: Executes server-side JavaScript, ensuring seamless integration between frontend and backend components.
- **Express.js**: Simplifies routing, middleware, and HTTP request handling for building scalable and robust web APIs.
- **MongoDB**: A versatile NoSQL database for efficient data storage and retrieval, offering flexibility and scalability.
- **Vue.js**: Empowers the creation of dynamic and interactive user interfaces, enhancing user experiences with its progressive JavaScript framework.
- **Mocha**: A comprehensive testing framework for running unit and integration tests, ensuring reliable functionality.
- **Chai**: An assertion library that provides expressive and readable test assertions, complementing Mocha in creating effective test suites.

By leveraging this technology stack, the project achieves seamless integration, efficient server-side development, flexible data management, engaging frontend experiences, and reliable application testing.

## Features

## Run project

Node.js needs to be installed, use version 16.13.1 to run this project. I recommend using nvm to install and manage node version.

[Install nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Clone the repository 

`git clone https://github.com/AholanLate/bikeapp.git`

### Backend

Change directory to project root

`cd bikeapp`

Create .env file to project root. Use variables provided separately

Use correct node version

`nvm use 16.13.1`

Install and update dependencies

`npm install`

`npm update`

Make sure you have port 4000 available for use. Otherwise, you need to make room for the project in port 4000, or change port in the .env file. If you change port in .env file, you need to make some adjustments in frontend later as well. 

Nodemon needs to be installed separately

`npm install nodemon`

Run the app

`npm run dev`


### Frontend

Move to frontend directory

`cd client`

Again, make sure you are using node version 16.13.1

`npm install`

`npm update`

Important, if backend is not running in 4000 you need to change port in axios urls accordingly. You can search client directory with `axios.get(` to find the URLs that needs to be changed

Run frontend

`npm run dev`

### Tests 

Install mocha

`npm install -g mocha`

Run tests 

`npm run test`

## Next

How would I continue to develop this project?

