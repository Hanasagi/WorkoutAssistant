<template>
  <Home/>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');
  :root{
    --background: #040F16;
    --el-background: #133144;
  }
  body{
    margin: 0;
  }
#app {
  font-family: 'Inter',sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*{
  box-sizing: border-box;
}
</style>
