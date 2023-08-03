<template>
  <RouterView/>
</template>

<script setup>
import {onMounted} from 'vue';
import {useloginStore} from './store/store';

let login = useloginStore()


onMounted(() => {
  let data = localStorage.getItem('user')
  if (data) {
    try {
      data = JSON.parse(data)
      login.user = data

    } catch (e) {
    }
  }
})

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
