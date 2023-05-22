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

## Stack

used stack

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

Make sure you have localhost 4000 not in use already. Otherwise, you need to make room for the project in port 4000, or change port in .env. If you change port in .env file, you need to make some adjustments in frontend later as well. 

Nodemon needs to be installed separately

`npm install nodemon`

Run the app

`npm run dev`


### Frontend

Move to frontend directory

`cd client`

Again, swich to node 16.13.1

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

