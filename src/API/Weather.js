import axios from "axios";


const API_KEY = process.env.VUE_APP_WEATHER_API_KEY;
const URL = process.env.VUE_APP_WEATHER_BASE_URL;

export default {
    
    getWeatherInfo(lon,lat){
        return axios.get(URL,{
            params:{
                lat:lat,
                lon:lon,
                units:"metric",
                appid:API_KEY,
                exclude:'alert',
            }
        });
    },
}