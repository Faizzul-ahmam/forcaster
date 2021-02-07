
const Geolocation = () => {

        if(!navigator.geolocation) 
        {
            alert('Geolocation is not supported by your browser')
        } 
        else 
        {
            console.log('Locating…')
            return new Promise((success, error) => {
                navigator.geolocation.getCurrentPosition(success, error,{enableHighAccuracy: true})
            })
        }
    
} 
  

export default Geolocation