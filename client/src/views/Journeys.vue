<template>
  <div class="content mt-5">
    <h1>Journeys</h1>
    
    <div class="filters m-auto">
      <p class="mt-5">filter results with:</p>

      <div class="is-flex m-1">
        <input
          class="input is-small"
          placeholder="Departure station name"
          v-model="departureStationName"
        >
        <button
          class="button is-small ml-1"
          @click="loadByDep"
        >
          >
        </button>
      </div>

      <div class="is-flex m-1">
        <input
          class="input is-small"
          placeholder="Return station name"
          v-model="returnStationName"
        >
        <button
          class="button is-small ml-1"
          @click="loadByRet"
        >
          >
        </button>
      </div>

      <p class="mt-5">Or load all</p>
      <button class="button" @click="loadTrips">Load</button>
    </div>

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
      <button class="button is-small mr-1" @click="previousPage" v-if="currentPage > 1">&lt;</button>
      <button class="button is-small ml-1" @click="nextPage">></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      trips: [],
      currentPage: 1,
      totalPages: null,
      departureStationName: '',
      returnStationName: '',
    }
  },
  methods: {
    async loadTrips(page = 1) {
  try {
    const response = await axios.get(`http://localhost:4000/trips?page=${page}`);
    if (response.data) {
      this.trips = response.data.trips;
      this.totalPages = response.data.totalPages;
      this.currentPage = response.data.currentPage;
    }
  } catch (error) {
    console.log(error);
  }
},
    nextPage() {
      if (this.totalPages !== null && this.currentPage < this.totalPages) {
        const nextPage = this.currentPage + 1;
        if (this.departureStationName !== '') {
          this.loadByDep(nextPage);
        } else if (this.returnStationName !== '') {
          this.loadByRet(nextPage);
        } else {
          this.loadTrips(nextPage);
        }
      }
    },

    previousPage() {
      if (this.currentPage > 1) {
        const previousPage = this.currentPage - 1;
        if (this.departureStationName !== '') {
          this.loadByDep(previousPage);
        } else if (this.returnStationName !== '') {
          this.loadByRet(previousPage);
        } else {
          this.loadTrips(previousPage);
        }
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
    },

    async loadByDep(page = 1) {
      try {
        if (this.departureStationName !== '') {
          const response = await axios.get(`http://localhost:4000/trips/departure/${this.departureStationName}?page=${page}`);
          this.trips = response.data.trips;
          this.totalPages = response.data.totalPages;
          this.currentPage = response.data.currentPage;

          // Reset return station name field
        this.returnStationName = '';
        }
      } catch (error) {
        console.log(error);
      }
    },

    async loadByRet(page = 1) {
      try {
        if (this.returnStationName !== '') {
          const response = await axios.get(`http://localhost:4000/trips/return/${this.returnStationName}?page=${page}`);
          this.trips = response.data.trips;
          this.totalPages = response.data.totalPages;
          this.currentPage = response.data.currentPage;

          // Reset departure station name field
          this.departureStationName = '';
        }
      } 
      catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>
.content {
  text-align: center;
}
.filters{
  width: 300px;
}
table{
  margin: auto;
}
</style>
