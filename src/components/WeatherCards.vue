<template>
  <div  v-for='(day,i) in dailyWeather.slice(1, 6)' :key='i' class="wrap card col-mid row-mid">
      <h4>{{getDay(day.dt)}}</h4>
      <p>{{getDate(day.dt)}}</p>
      <img :src="getWeatherIcons(day.weather[0].main)"/>
      <h5>{{day.weather[0].main}}</h5>
      <h4 class="gradient-text">{{day.temp.night.toFixed(0)}}°</h4>
  </div>
</template>

<script>
import returnImage from '../assets/image/weather'
import moment from 'moment-timezone'
import Helper from '@/utils'
export default {
  name:'WeatherCards',
  components:{},
  props:{
    weather:Object,
    timezone:String
  },
  setup(props){

    const dailyWeather = props.weather
    const timezone = props.timezone
    const getDay = (dt) =>{return moment.unix(dt).format('dddd')}
    const getWeatherIcons = (time,condition) => returnImage(time,condition)
    const getDate = (dt) =>{return moment.unix(dt).format('DD/MM')}
    return{dailyWeather,getDay,timezone,getWeatherIcons,getDate}
  }
}
</script>

<style>

</style>