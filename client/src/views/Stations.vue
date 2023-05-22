<template>
  <div class="content mt-5">
    <h1>Stations</h1>

    <div class="filters m-auto has-text-left">
      <p class="mt-5">filter results with:</p>

      <div class="is-flex">
        <input
          class="input is-small"
          placeholder="Station name"
          v-model="stationName"
        >
        <button
          class="button is-primary is-small ml-1"
          @click="stationByName"
        >
          >
        </button>
      </div>
      <p class="mt-5">Or load all</p>
      <button class="button is-primary" @click="loadStations">Load All</button>
    </div>
    
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
      currentPage: 1, 
      totalPages: null, 
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
      // check if there are still pages left
      // increment the currentPage by 1 and pass it to the loadTrips function
      if (this.currentPage < this.totalPages) { 
        this.loadStations(this.currentPage + 1) 
      }
    },

    previousPage() {
      // check if currentPage is not the first page
      // decrement the currentPage by 1 and pass it to the loadTrips function
      if (this.currentPage > 1) { 
        this.loadStations(this.currentPage - 1) 
      }
    },
    
    async stationByName() {
      try{
        // Convert first letter to uppercase
        this.stationName = this.stationName.charAt(0).toUpperCase() + this.stationName.slice(1);
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
