import { createStore } from 'vuex'
import Weather from '../API/Weather'
import SearchLocation from '../API/SearchLocation'
import Helper from '../utils'

export default createStore({
  state: {
    currentLocationTime:{
      current:null,
      sunset:null,
      sunrise:null
    },
    isLoading:true,
    data:null,
    searchList:null,
    isSearchingLocation:true,
    CurrentLocation:{
      lon:null,lat:null,isUpdated:false,regionName:null
    },
    isLocationGranted:true,
    currentTheme:null
  },
  getters:{
    getCurrentLocation(state){
      return state.CurrentLocation
    },
    getWeatherInfo(state){
      return state.data
    },
    getLoadingStatus(state){
      return state.isLoading
    },
    getGeolocationGrant(state){
      return state.isLocationGranted
    },
    getSearchedLocationList(state){
      return state.searchList
    },
    getCurrentTheme(state){
      return state.currentTheme
    },
    getCurrentLocationTime(state){
      return state.currentLocationTime
    }
  },
  mutations: {
    ASSIGN_WEATHER(state,weatherInfo){
      state.data=weatherInfo
    },
    UPDATE_SEARCH_LIST(state,newLocationsList){
      state.searchList = newLocationsList
    },
    GRANT_LOCATION_ACCESS(state,permission){
      state.isLocationGranted = permission
    },
    UPDATE_THEME(state){
      state.isLightMode = !isLightMode
    },
    UPDATE_CURRENT_LOCATION(state,coordinate){
      state.CurrentLocation.lat = coordinate.latitude
      state.CurrentLocation.lon = coordinate.longitude
      state.CurrentLocation.isUpdated = true
    },
    UPDATE_CURRENT_LOCATION_REGION(state,regionName){
      state.CurrentLocation.regionName= regionName
    },
    UPDATE_LOADING_FLAG(state,status){
      state.isLoading=status
    },
    CLEAR_SEARCHED_LIST(state){
      state.searchList = null
    },
    UPDATE_SEARCHING_FLAG(state,status){
      state.isSearchingLocation = status
    },
    SET_CURRENT_THEME(state,theme){
      state.currentTheme = theme
    },
    SET_CURRENT_LOCATION_TIME(state,time){
      state.currentLocationTime = time
    }
  },
  actions: {
    
      getWeatherData({commit,state}){
        return new Promise((success, fail) => {
          const coodinate = state.CurrentLocation
          commit('UPDATE_LOADING_FLAG',true)
          Weather.getWeatherInfo(coodinate.lon,coodinate.lat)
          .then(response =>{
            let weatherInfo = response.data
            let currentInfo = weatherInfo.current
            commit('ASSIGN_WEATHER',weatherInfo)
            success(weatherInfo)
            // this.dispatch('updateCurrentTime',currentInfo)
            commit('SET_CURRENT_LOCATION_TIME',{current:currentInfo.dt,sunset:currentInfo.sunset,sunrise:currentInfo.sunrise})
            this.dispatch('getRegionName')
            // commit('UPDATE_LOADING_FLAG',false)
          })
          .catch((err)=>{
            console.log('Api err: '+err)
            fail(err)
          })

          this.dispatch('setTheme',Helper.time.checkTime() == 'day'?'light':'dark')
          
        })
      },
      getRegionName({commit,state}){
        return new Promise((success,fail)=>{
          const coordinate = state.CurrentLocation
          // commit('UPDATE_LOADING_FLAG',true)
          SearchLocation.getRegionByCoodinate(coordinate.lat,coordinate.lon)
          .then(response => {
            console.log(response.data)
            commit('UPDATE_CURRENT_LOCATION_REGION',response.data)
            success(response.data)
          })
          .catch((err)=>{
            console.log('Weather API err: '+err)
            fail(err)
          })
          .finally(() => {
            commit('UPDATE_LOADING_FLAG',false)
            success()
          })
      })
    },
    updateSearchList({commit,state},locationString){
      
      if(state.isSearchingLocation){
        commit("UPDATE_SEARCHING_FLAG",false) //set to false
        SearchLocation.SearchLocation(locationString)
        .then(response =>{
          let list = response.data
          commit('UPDATE_SEARCH_LIST',list)
          commit("UPDATE_SEARCHING_FLAG",true) //set to true
        })
        .catch((err)=>{
          console.log('IQ Location err: '+err)
          commit("UPDATE_SEARCHING_FLAG",true) //set to true
        })

      }
    },
    updateCurrentCoordinate({commit},coordinate){
      return new Promise((success, fail) => {
        commit('UPDATE_CURRENT_LOCATION',coordinate)
        success()
      })
    },
    
    updateLocationPermission({commit},permission){
      return new Promise((success, fail) => {
        commit('GRANT_LOCATION_ACCESS',permission)
        success()
      })

    },
    theme_transition(){
      document.documentElement.classList.add('transition');
      window.setTimeout(() => {
          document.documentElement.classList.remove('transition')
      }, 1000)
    },
    setTheme({commit,state},theme = (state.currentTheme == 'light'?'dark':'light')){
      let tag = document.getElementsByTagName("HTML")[0];
      this.dispatch('theme_transition')
      commit("SET_CURRENT_THEME",theme)
      tag.setAttribute("data-theme",state.currentTheme)
    },

  },
  modules: {
  }
})
