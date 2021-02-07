<template>
  <div class="main-container">
    <Navbar/>
    <Weather v-if="!isLoading"/>
    <div v-if="isLoading && isGeolocationGranted" class="spinner">
      <hollow-dots-spinner 
        :animation-duration="900"
        :dot-size="20"
        :dots-num="5"
        color="var(--accent-color)"
      />
      </div>
      <div v-if="!isGeolocationGranted">
          <h1>Oops, we cannot access your current location, can try search by locations</h1>
      </div>
    <Footer/>
  </div>
</template>

<script>
import Helper from './utils'
import { useStore } from 'vuex'
import {computed,onMounted,ref} from 'vue'
import { HollowDotsSpinner } from 'epic-spinners'
import Navbar from './components/NavBar.vue'
import Weather from './components/Weather.vue'
import Spinner from './components/Spinner.vue'
import Footer from './components/Footer.vue'

export default {
  name:'App',
  components:{Navbar,Weather,Spinner,Footer, Footer},
  setup(){
    
    //Data / Variables
    const store = useStore()
    const isLoading = computed(()=>store.getters.getLoadingStatus)
    const isGeolocationGranted = computed(()=>store.getters.getGeolocationGrant)
    const time = Helper.time.checkTime 
    //Lifecycle
    onMounted(()=>{
      console.log('App mounted')
      Helper.Geolocation()
      .then((coordinate)=>
      {
        console.log("Geolocation Success")
        store.dispatch('updateLocationPermission',true)
        .then(() =>
        {
          store.dispatch('updateCurrentCoordinate',coordinate.coords)
          .then(() =>{
            store.dispatch('getWeatherData')
          })
        })
      })
      .catch(error => {
        console.log("Geolocation Failed")
        store.dispatch('updateLocationPermission',false)
        console.log(error)
      })
    })

      return{HollowDotsSpinner,isLoading,isGeolocationGranted}
  }
}  

</script>

<style lang="scss">
body{
  margin: 0;
}
</style>
