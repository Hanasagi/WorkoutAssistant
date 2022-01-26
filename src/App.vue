<template>
  <Home/>
</template>

<script>
import Home from './components/Home/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Raleway:wght@400;600&display=swap');
:root{
  --bg-first-level:#111317;
  --bg-second-level:#14181F;
  --bg-third-level:#1B212B;
  --main-color:#55A2FF;
  --secondary-color:#FFC354;
  --white:#E1E1E1;
  --black:#2C2C2C;

  --font-size-sm: clamp(0.8rem, 0.18vw + 0.68rem, 0.89rem);
--font-size-base: clamp(1rem, 0.37vw + 0.75rem, 1.19rem);
--font-size-md: clamp(1.25rem, 0.65vw + 0.8rem, 1.58rem);
--font-size-lg: clamp(1.56rem, 1.07vw + 0.83rem, 2.11rem);
--font-size-xl: clamp(1.95rem, 1.68vw + 0.8rem, 2.81rem);
--font-size-xxl: clamp(2.44rem, 2.55vw + 0.69rem, 3.75rem);
--font-size-xxxl: clamp(3.05rem, 3.8vw + 0.44rem, 5rem);

  --main-font:'Raleway';
  --secondary-font:'Open Sans';
}
  body{
    margin: 0;
  }
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*{
  box-sizing: border-box;
}
button{
  border:none;
  background:none;
}
h1,h2,h3,h4,h5,p{
  line-height:1;
}

@media screen and (max-width:1920px){
  html{
    font-size:19px;
  }
}
@media screen and (max-width:1100px){
  html{
    font-size:16px;
  }
}
</style>
