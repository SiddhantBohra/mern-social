const express = require('express')
const app = express()
const morgan = require('morgan')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const parser = require('body-parser')
const port = process.env.PORT||8080
const expressValidator = require('express-validator')

dotenv.config()

//import routes
const postGetRoutes = require('./routes/posts')
const authRoutes = require('./routes/auth')

// middleware
app.use(expressValidator())
app.use(express.json())
app.use(parser.urlencoded({extended : true}))
app.use(morgan('dev'))
app.use('/',postGetRoutes)
app.use('/',authRoutes)

//db

mongoose.connect(process.env.MONGO_DB_URI,{useNewUrlParser : true}, () =>{
    console.log('DB Connected Successfully')
}).catch(err =>{
    console.log('Error Connecting to DB' + err.message)
})

//Port Listen
app.listen(port, () =>{
    console.log('Node JS Application Listening on' + ' ' + `${port}`)
})