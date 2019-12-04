<template>
  <div id="app">
    <!-- <h1>Hello Vue.js</h1> -->
    <login/>
    <list />
  </div>
</template>

<script>
import List from "./components/List.vue";
import Login from "./components/auth/Login.vue";

export default {
  name: "app",
  components: {
    List,
    Login
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
