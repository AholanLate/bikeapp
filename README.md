# BikeApp

This is a pre-assignment for Solita Dev Academy Finland 2023. Made by Lauri Ahola.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Run project](#run-project)

## Project Description 

In this project, datasets are validated and imported into MongoDB. The backend, built with Node.js and Express.js, establishes a connection to the MongoDB database and exposes API routes for fetching data based on specified parameters. Vue.js is utilized to create views for stations and journeys, while Axios handles API requests and retrieves data from the backend. The retrieved data is then presented in tables for easy visualization and analysis.

## Used Stack

The project relies on the following technologies:

- **Node.js**: Executes server-side JavaScript, ensuring seamless integration between frontend and backend components.
- **Express.js**: Simplifies routing, middleware, and HTTP request handling for building scalable and robust web APIs.
- **MongoDB**: A versatile NoSQL database for efficient data storage and retrieval, offering flexibility and scalability.
- **Vue.js**: Empowers the creation of dynamic and interactive user interfaces, enhancing user experiences with its progressive JavaScript framework.
- **Axios.js**: A popular HTTP client library for JavaScript that simplifies making asynchronous HTTP requests from both the frontend and backend. It is used to communicate with the backend server and fetch data from the APIs.
- **Bulma**: CSS framework
- **Mocha**: A comprehensive testing framework for running unit and integration tests, ensuring reliable functionality.
- **Chai**: An assertion library that provides expressive and readable test assertions, complementing Mocha in creating effective test suites.

### Data Validation

The datasets used in the application underwent validation to ensure data accuracy and consistency. Python scripts were employed to drop rows with empty fields, remove duplicates, and filter out trips with minimal distance or duration. Additionally, Excel Power Query was utilized for further data cleansing and transformation tasks, such as rounding values and converting data types. 

## Features

### Backend 

#### index.js

The `index.js` file serves as the entry point for the backend server. It establishes a connection to the MongoDB database using `mongoose.connect()`. The server defines routes for handling requests related to trips and stations using the `tripsRoute` and `stationsRoute` routers, respectively. Additionally, it listens on a specified port and has a default route for the base URL.

#### stationsRoute

The `stationsRoute.js` file defines routes for fetching stations with pagination and finding stations by ID or name. It interacts with the `Station` model to retrieve data from the MongoDB database.

#### tripsRoute

The `tripsRoute.js` file defines routes for fetching trips with pagination, getting trip statistics for a specific station, and finding trips by departure or return station name. It interacts with the `Trip` model to retrieve data from the MongoDB database.

### Frontend

#### Journeys.vue and Stations.vue

The `Journeys.vue` and `Stations.vue` components are part of a Vue.js frontend application. They provide user interfaces for searching and displaying journey and station information, respectively. These components share some common features:

- **Filtering**: Users can enter specific criteria, such as station names, to filter the results. The components provide input fields where users can enter the desired criteria and buttons to initiate the search.

- **Loading all**: Users have the option to load all journeys or stations without applying any filters. This functionality is triggered by a "Load All" button.

- **Pagination**: Both components support pagination to navigate through the results. Users can use previous and next buttons to move between pages of journeys or stations.

- **Displaying results**: The components present the search results in tables. `Journeys.vue` displays journey details such as departure station, return station, departure time, duration, and distance. `Stations.vue` displays station details, including the station ID, name, address, capacity, and a link to view additional station details.

- **Empty result notification**: If the search does not yield any matching journeys or stations, a message is displayed to inform the user.

These components leverage Vue.js reactivity to update the displayed data based on user interactions and API responses. They use Axios, a popular HTTP client library, to handle the HTTP requests and communicate with the backend server. Axios allows fetching the required data from the backend server through HTTP requests.

#### Station Details

Station details is opened if link "station details" is clicked in the stations view. Station details loads the data for few seconds, and then displays some additional statistics about the station. 

### Tests

- **Station Search**: The test files include tests to search for stations by name using the `/stations/byName/:name` endpoint. These tests verify that the API returns the expected station details, including ID, name, address, and city.

- **Station Not Found**: The test files include tests to handle scenarios where a station is not found. They ensure that the API response is empty when searching for a non-existent station using the `/stations/byName/:name` endpoint.

- **Station Details by ID**: The test files include tests to retrieve station details by their ID using the `/stations/:id` endpoint. These tests verify that the API returns the expected station details, including ID, name, address, and city.

- **Station ID Not Found**: The test files also include tests to handle scenarios where a station with a specific ID is not found. They ensure that the API returns a 404 error when requesting a non-existent station using the `/stations/:id` endpoint.

- **Trips List with Pagination**: The test files include tests to retrieve a list of trips with pagination using the `/trips` endpoint. These tests verify that the API response contains the expected data, including the current page, total pages, total items, and an array of trips.

- **Trip Statistics by Station ID**: The test files include tests to retrieve trip statistics for a specific station using the `/trips/:id` endpoint. They verify that the API response contains the expected statistics, such as the number of starting trips, ending trips, average starting trip distance, and average return trip distance.

- **Trips by Departure Station Name**: The test files include tests to retrieve trips with a particular departure station name using the `/trips/departure/:name` endpoint. They ensure that the API response contains the expected data, including the current page, total pages, total items, and an array of trips.

- **Trips by Return Station Name**: The test files include tests to retrieve trips with a specific return station name using the `/trips/return/:name` endpoint. They ensure that the API response contains the expected data, including the current page, total pages, total items, and an array of trips.

These test files contain tests that validate the functionality of the corresponding API endpoints related to stations and trips. These tests help ensure the correctness and reliability of the API implementation.

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





