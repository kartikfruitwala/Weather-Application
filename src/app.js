const path = require('path')
const express = require('express')
const hbs=require('hbs')
const request=require('request')
const { title } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//define paths for express config
const publicDir = path.join(__dirname, '../public/')
const viewPath= path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup handlebars and view location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Kartik'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kartik'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        message:'This section is about the help ',
        title:'Help',
        name:'Kartik'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error:'Unable to find location. Try again'
        })
    }else{
        const command=req.query.address
        geocode(command, (error, {lantitude,longitude,location}={}) => {
            if(error){
                return res.send(error)
            }
            
            forecast(lantitude, longitude, (error, forecastData) => {
                if(error){
                    res.send(error)
                }else{
                    res.send({
                        forecast:forecastData,
                        address:location
                    })

                }
                
            })
        })

        
    }
})
app.get('/help/*',(req,res)=>{
    res.render('errorPage',{
        message:'Help article not found',
        title:'Help error 404',
        name:'Kartik'
    })
})
app.get('*',(req,res)=>{
    res.render('errorPage',{
        message:'Page Not found',
        title:'Error 404',
        name:'Kartik'
    })
})
app.listen(3000, () => {
    console.log("server is running on port 3000 ")
})