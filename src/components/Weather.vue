<template>
    <div class="padding-page">
        <h2 class="padd-top">{{ region.city || region.town || region.village}}</h2>
        <h5>{{DateTimeNow(weatherInfo.timezone)}}</h5>
    </div>
    <div class="wrap one-half row-mid weather-container">
        <div class="wrap one-half row-mid">
            <div class="weather-icon">
                <h5>{{currentWeather.weather[0].main}}</h5>
                <img :src="getWeatherIcons(currentWeather.weather[0].main)"/>
            </div>
            <div>
                <h1>{{currentWeather.temp.toFixed(0)}}°</h1>
                <h5>Feels like {{currentWeather.feels_like.toFixed(0)}}°</h5>
            </div>
        </div>
        <div class="self-mid">
            <!-- Graph -->
        </div>
    </div> 
    <div class="card-container">
        <WeatherCards :weather='dailyWeather' />
    </div>
</template>

<script>
import { useStore } from 'vuex'
import {computed,onMounted,ref} from 'vue'
import WeatherCards from './WeatherCards.vue'
import Helper from '@/utils'
import returnImage from '../assets/image/weather'

export default {
    name:'Weather',
    components:{WeatherCards},
    setup(){
        const store = useStore()
        const weatherInfo = computed(()=>store.getters.getWeatherInfo)
        const currentWeather = computed(()=>store.getters.getWeatherInfo.current)
        const dailyWeather = computed(()=>store.getters.getWeatherInfo.daily)
        // const DateTimeNow = timezone =>{ return moment().tz(timezone).format('DD MMMM , dddd')}
        const DateTimeNow = timezone => Helper.time.DateToday(timezone)
        const titleCase = text =>{return text.replace(/(?:^|\s|-)\S/g, x => x.toUpperCase())}
        const region = computed(()=>store.getters.getCurrentLocation.regionName.address)

        const getWeatherIcons = (time,condition) => returnImage(time,condition)
        onMounted(()=>{
            console.log("WeatherMount")
            console.log(weatherInfo)
            
            //retrieve locations name
        })

        return{titleCase,currentWeather,weatherInfo,DateTimeNow,dailyWeather,region,getWeatherIcons}
    }
}
</script>

<style>

</style>