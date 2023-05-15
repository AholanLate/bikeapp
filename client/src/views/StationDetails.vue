<template>
    <div>
      <h1>Station Details</h1>
      <p>ID: {{ station.ID }}</p>
      <p>Name: {{ station.Nimi }}</p>
      <p>Address: {{ station.Osoite }}</p>
      <p>Capacity: {{ station.Kapasiteet }}</p>
      <button @click="goBack">Previous Page</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  export default {
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        station: {}
      }
    },
    async created() {
      try {
        const response = await axios.get(`http://localhost:4000/stations/${this.id}`)
        if (response.data) {
          this.station = response.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    }
  }
  </script>
  