<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="bike app logo" class="logo" src="@/assets/bike.svg" width="200" height="200" />
    <h1 class="is-size-5">Helsinki City Bike app</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/Journeys">Journeys</RouterLink>
      <RouterLink to="/Stations">Stations</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  font-size: 15px;
  text-align: center;
  margin-top: 2rem;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    margin: auto;
  }

  .logo {
    margin: 0 2rem 0 0;
    margin: auto;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: center;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
