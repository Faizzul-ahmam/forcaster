<template>
<div class="autocomplete">  
  <input type="text" placeholder="Search Location"
  v-model="inputLocation"
  @input="onTyping" @focus="inputInteraction(false)" @blur="inputInteraction(true)">
  <ul class="autocomplete-results"
  v-show="!searchedDone">
    <li class="autocomplete-result" 
    v-for="(list,i) in locationList" 
    :key="i" 
    @click="getWeather({longitude:list.lon,latitude:list.lat})">{{list.address.city || list.address.town || list.display_place}} <p>{{list.display_name}}</p></li>
  </ul>
</div>
</template>
<script>
import {computed,ref} from 'vue'
import { useStore } from 'vuex'

export default {
  name:'SearchBar',
  setup(){
    const store = useStore()
    const inputLocation = ref("")
    const searchedDone = ref(false)
    const locationList = computed(()=>store.getters.getSearchedLocationList)
    
    //Method
    const inputInteraction = status =>{ window.setTimeout(() =>{searchedDone.value = status},200)}
    const onTyping = () =>{
      if (inputLocation.value.length >3){
        searchedDone.value = false
        getLocationList()
        // setTimeout(() => getLocationList(),800)
      }else{
        searchedDone.value = true
        store.commit('CLEAR_SEARCHED_LIST')
      }
    }

    const getLocationList = () =>{
      console.log("updateSearchList")
      store.dispatch('updateSearchList',inputLocation.value)
    }//end of getLocationList

    const getWeather = coordinate =>{
      store.dispatch('updateCurrentCoordinate',coordinate)
      store.dispatch('getWeatherData')
      searchedDone.value = true
    }
        

    // const getWeatheronSearchedLocation = e =>{
    //   var Coordinate = event.target.value;
    //   console.log(Coordinate)
    // }
  return{inputLocation,searchedDone,onTyping,locationList,getWeather,inputInteraction}
  }
}
</script>

<style>

</style>