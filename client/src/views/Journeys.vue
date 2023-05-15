<template>
  <div class="content mt-5">
    <h1>Trips</h1>

    <button class="button" v-if="!trips.length" @click="loadTrips()">
      Load trips
    </button>
    <div>
      <table v-if="trips.length" class="table is-fullwidth is-striped is-hoverable has-text-left m-5">
        <thead>
          <tr>
            <th class="has-text-weight-bold">From</th>
            <th class="has-text-weight-bold">To</th>
            <th class="has-text-weight-bold">Start</th>
            <th class="has-text-weight-bold">Duration</th>
            <th class="has-text-weight-bold">Distance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trip in trips" :key="trip._id">
            <td>{{ trip.departure_station_name }}</td>
            <td>{{ trip.return_station_name }}</td>
            <td>{{ trip.departure_time }}</td>
            <td>{{ formatTime(trip.duration) }}</td>
            <td>{{ trip.distance }}m</td>
          </tr>
        </tbody>
      </table>
      <div v-if="trips.length">
      <p>Page {{ currentPage }} of total pages of {{ totalPages }}</p>
      <button class="button is-small mr-1" @click="previousPage" v-if="currentPage>1">&lt;</button>
      <button class="button is-small ml-1" @click="nextPage">></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      trips: [],
      currentPage: 1, // add currentPage variable to the data object
      totalPages: null // add totalPages variable to the data object
    }
  },
  methods: {
    async loadTrips(page = 1) {
      try {
        const response = await axios.get(`http://localhost:4000/trips?page=${page}`)
        if (response.data) {
          this.trips = response.data.trips
          this.totalPages = response.data.totalPages
          this.currentPage = response.data.currentPage // set current page from response
        }
      } catch (error) {
        console.log(error)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) { // check if there are still pages left
        this.loadTrips(this.currentPage + 1) // increment the currentPage by 1 and pass it to the loadTrips function
      }
    },
    previousPage() {
      if (this.currentPage > 1) { // check if currentPage is not the first page
        this.loadTrips(this.currentPage - 1) // decrement the currentPage by 1 and pass it to the loadTrips function
      }
    },
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      const formattedHours = hours.toString().padStart(1, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
  }
}
</script>

<style>
.content {
  text-align: center;
}
table{
  margin: auto;
}
</style>
