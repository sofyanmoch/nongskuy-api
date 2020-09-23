const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routerNavigation = require('./src/router')
const { static } = require('express')
const cors = require('cors')

app.use(express.static('asset/img/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const { port }  = require('./src/helpers/env')
app.use(cors())

app.use('/',routerNavigation)
app.listen( port , () => {
    console.log(`app running on port ${port}`)
})