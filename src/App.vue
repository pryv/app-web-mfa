<template>
  <div id="app">
    <img
      alt="Logo"
      src="./assets/logo.png"
    >
    <Activation />
    <Deactivation />
  </div>
</template>

<script>
import Activation from './components/Activation.vue';
import Deactivation from './components/Deactivation.vue';

export default {
  name: 'App',
  components: {
    Activation,
    Deactivation,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
