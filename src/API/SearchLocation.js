import axios from "axios";


const API_KEY = process.env.VUE_APP_LOCATION_API_KEY;
const URL = process.env.VUE_APP_LOCATION_BASE_URL;
const URL1 = process.env.VUE_APP_LOCATION_BASE_URL1;

export default {

    SearchLocation(string){
        return axios.get(URL1 +'autocomplete.php?',{
            params:{
                key:API_KEY,
                q:string,
                limit:5,
                place:'city,town',
                normalizecity:1,
                dedupe:1
            }
        });
    },

    getRegionByCoodinate(lat,lon){
        return axios.get(URL+'reverse.php?',{
            params:{
                key:API_KEY,
                lat:lat,
                lon:lon,
                format:'json'
            }
        });
    }
}