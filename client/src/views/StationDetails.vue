<template>
  <div class="details m-auto">
    <h1 class="is-size-5 has-text-centered mt-5">Station Details</h1>
    <!-- Show the loading animation while the data is being loaded -->
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="p-3">
        <p>ID: {{ station.ID }}</p>
        <p>Name: {{ station.Nimi }}</p>
        <p>Address: {{ station.Osoite }}</p>
        <p>Capacity: {{ station.Kapasiteet }}</p>
        <p>Trips from: {{stationStats.startingTrips}}</p>
        <p>Trips to: {{stationStats.endingTrips}}</p>
        <p>Average distance from: {{stationStats.avgStartingTripDistance}}m</p>
        <p>Average distance to: {{stationStats.avgReturnTripDistance}}m</p> 
        <button class="button is-primary is-small mt-3" @click="goBack">Previous Page</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      station: {},
      stationStats: {},
      loading: true
    }
  },
  async created() {
    // get station info
    try {
      const response = await axios.get(`http://localhost:4000/stations/${this.id}`)
      if (response.data) {
        this.station = response.data
      }
    } catch (error) {
      console.log(error)
    }
    // trip statistics for stations
    try{
      const response = await axios.get(`http://localhost:4000/trips/${this.id}`)
      if (response.data) {
        this.stationStats = response.data
      }
    }
    catch (error) {
      console.log(error)
    }
    this.loading = false
    },
  methods: {

    // previous page button
    goBack() {
      this.$router.go(-1)
      }
    }
  }
</script>

<style>
 .details{
  width: 350px;
 }
</style>