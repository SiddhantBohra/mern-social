const express = require('express')
const app = express()
const morgan = require('morgan')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const parser = require('body-parser')
const port = process.env.PORT || 8080
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const fs = require('fs')
const cors = require('cors')
dotenv.config()

//import routes
const postGetRoutes = require('./routes/posts')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
// middleware
app.use(expressValidator())
app.use(express.urlencoded({extended : true}))
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())
app.use('/', postGetRoutes)
app.use('/', authRoutes)
app.use('/',userRoutes)
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: "Unauthorized Token" });
    }
});
//API Docs
app.get('/', (req, res) => {
    fs.readFile('docs/apiDocs.json' ,(err,data) =>{
        if(err)
        {
            res.status(403).json({
                error : err
            })
        }
        const docs = JSON.parse(data)
        res.json(docs)
    })
});
//db
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true }, () => {
    console.log('DB Connected Successfully')
}).catch(err => {
    console.log('Error Connecting to DB' + err.message)
})

//Port Listen
app.listen(port, () => {
    console.log('Node JS Application Listening on' + ' ' + `${port}`)
})