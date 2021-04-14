<template>
<footer>
  <p>© {{year}} Forecaster | <a href="https://faizzul.com/" target="_blank">Made by Faizzul</a> | <a href="https://locationiq.com/" target="_blank">Location Iq</a></p>
  <!-- <p>Data by </p> -->
</footer>
</template>

<script>
export default {
  name:'Footer',
  components:{},
  setup(){

    const year = new Date().getFullYear();

    return{year}
  }    
}
</script>

<style>

</style>