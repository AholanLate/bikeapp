<template>
  <div class="content mt-5">
    <h1>Stations</h1>

    <div class="filters m-auto">
      <p class="mt-5">filter results with:</p>

      <div class="is-flex m-1">
        <input
          class="input is-small"
          placeholder="Station name"
          v-model="stationName"
        >
        <button
          class="button is-small ml-1"
          @click="stationByName"
        >
          >
        </button>
      </div>
    </div>
    <p class="mt-5">Or load all</p>
      <button class="button" @click="loadStations">Load</button>
    
    <div class="mt-5 has-text-danger" v-if="notyEmptyResult === true">Station not found, check name</div>

    <div>
      <table v-if="stations.length > 0" class="table is is-striped is-hoverable has-text-left m-5">
        <thead>
          <tr>
            <th class="has-text-weight-bold">ID</th>
            <th class="has-text-weight-bold">Name</th>
            <th class="has-text-weight-bold">Address</th>
            <th class="has-text-weight-bold">Capacity</th>
            <th class="has-text-weight-bold">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="station in stations" :key="station.ID">
            <td>{{ station.ID }}</td>
            <td>{{ station.Nimi }}</td>
            <td>{{ station.Osoite }}</td>
            <td>{{ station.Kapasiteet }}</td>
            <td><router-link :to="{ name: 'stationDetails', params: { id: station.ID } }">Station details</router-link></td>
          </tr>
        </tbody>
      </table>
      <div v-if="stations.length > 0">
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
      stations: [],
      currentPage: 1, // add currentPage variable to the data object
      totalPages: null, // add totalPages variable to the data object
      notyEmptyResult: false,
      stationName: ''
    }
  },
  methods: {
    async loadStations(page = 1) {
      try {
        const response = await axios.get(`http://localhost:4000/stations?page=${page}`)
        if (response.data) {

          
          this.stations = response.data.stations
          this.totalPages = response.data.totalPages
          this.currentPage = response.data.currentPage // set current page from response

          this.notyEmptyResult = false;
          this.stationName= ''

        }
      } catch (error) {
        console.log(error)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) { // check if there are still pages left
        this.loadStations(this.currentPage + 1) // increment the currentPage by 1 and pass it to the loadTrips function
      }
    },
    previousPage() {
      if (this.currentPage > 1) { // check if currentPage is not the first page
        this.loadStations(this.currentPage - 1) // decrement the currentPage by 1 and pass it to the loadTrips function
      }
    },
    async stationByName() {
      try{
        const response = await axios.get(`http://localhost:4000/stations/byName/${this.stationName}`)

        if (response.data){ 
          this.stations = [response.data]
          this.notyEmptyResult = false
        } 
        // noty user if not found
        else { 
          this.notyEmptyResult = true
          this.stations = [];
        }
      }
      catch (error) {
        console.log(error)
      }
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
