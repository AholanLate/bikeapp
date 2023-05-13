<template>
  <div class="content">
    <h1>Trips</h1>

      <button @click="loadOne">
        Load a trip
      </button>
      <div>
        <p v-for="(trip, index) in trips" :key="index">
          Route: {{ trip.departure_station_name }} to {{ trip.return_station_name }}<br>
          Start: {{ trip.departure_time }}<br>
          Duration: {{ trip.duration }}<br>
          Distance: {{ trip.distance }}m
        </p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      trips: []
    }
  },
  methods: {
    loadOne() {
      axios.get('http://localhost:4000/trips')
      .then(response => {
        if (response.data) {
          this.trips.push(response.data)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
}
</script>

<style>
.content {
  text-align: center;
}
</style>