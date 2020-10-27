const request = require("request")


const forecast=(lantitude,longitude,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+lantitude+'&lon='+longitude+'&appid=d9013dbae7bd3e62bc2497e439aeb0d1&units=metric'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the weather service!!!',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,'There is a '+body.daily[1].weather[0].description+" The Tempreture is: "+body.current.temp+" Celsius degrees out and The percentage of Cloud is:"+body.current.clouds+" The humidity is:"+body.current.humidity)
        }

    })
}

module.exports=forecast