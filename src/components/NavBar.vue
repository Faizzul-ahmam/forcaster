<template>
  <div class="padding-page flex between navbar">
      <a href="#"><h4>Forecaster</h4></a>
      <ThemeToggle :v-if="isThemeAvailable"/>
  </div>
  <div class="padding-page">
    <SearchBar/>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'
import ThemeToggle from './ThemeToggle.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name:'NavBar',
  components:{SearchBar,ThemeToggle},
  setup(){
    const store = useStore();
    const isThemeAvailable = computed(()=>{if(store.getters.getCurrentLocationTime){
      return true}else{return false}})

    return(isThemeAvailable)
  }
}
</script>

<style>

</style>