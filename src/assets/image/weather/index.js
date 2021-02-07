import Day from './day'
import Night from './night'
import Thunderstorm from './thunder.svg'
import dark_icon from './night.svg'
import light_icon from './day.svg'
import Helper from '../../../utils'

const returnImage = (weatherCondition = false) =>{


    if(Helper.time.checkTime() == 'day' && weatherCondition) {
        if (weatherCondition.toLowerCase().includes("clear")){return Day.clear}
        else if (weatherCondition.toLowerCase().includes("rain")){return Day.rain}
        else if (weatherCondition.toLowerCase().includes("drizzle")){return Day.drizzle}
        else if (weatherCondition.toLowerCase().includes("clouds")){return Day.cloud}
        else if (weatherCondition.toLowerCase().includes("snow")){return Day.snow}
        else if (weatherCondition.toLowerCase().includes("thunder")){return Thunderstorm}
        else {return Day.mist}
        
    }
    else if (Helper.time.checkTime() == 'night' && weatherCondition){
        if (weatherCondition.toLowerCase().includes("clear")){return Night.clear}
        else if (weatherCondition.toLowerCase().includes("rain")){return Night.rain}
        else if (weatherCondition.toLowerCase().includes("drizzle")){return Night.drizzle}
        else if (weatherCondition.toLowerCase().includes("clouds")){return Night.cloud}
        else if (weatherCondition.toLowerCase().includes("snow")){return Night.snow}
        else if (weatherCondition.toLowerCase().includes("thunder")){return Thunderstorm}
        else { return Night.mist}
    }
    else{
        return {day:light_icon,night:dark_icon}
    }

}

export default returnImage