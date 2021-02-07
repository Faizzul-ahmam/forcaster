import moment from 'moment'
import {useStore} from 'vuex'
import {computed} from 'vue'

const store = useStore()
const times = computed(() =>store.getters.currentLocationTime)
const current_time = computed(() => times.current)
const sunset_time = computed(() => times.sunset)
const sunrise_time = computed(() => times.sunrise)

const time =  {

    checkTime: ()=>{
        
        console.log(current_time.value)
        if(current_time >= sunrise_time && current_time <= sunset_time ) {
            console.log('day')
            return 'day'
            
        }
        else if (current_time >= sunset_time && current_time >= sunrise_time){
            console.log('night')
            return 'night'
        }
    },
    timeNow: dt => { return moment().unix(dt).format(LT)},
    DateToday: timezone => { return moment().tz(timezone).format('DD MMMM , dddd')}

}


export default time;