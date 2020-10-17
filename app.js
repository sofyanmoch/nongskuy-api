const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routerNavigation = require('./src/router')
const { static } = require('express')
const cors = require('cors')
const ejs = require('ejs')
const path = require('path')

app.set('views', path.join(__dirname,'src/views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, './dist')))
app.use(express.static('asset/img/'))
app.use(express.static('src/views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const { port }  = require('./src/helpers/env')
app.use(cors())

// app.use('*', (req,res) => {
//     res.sendFile(__dirname, './dist/index.html')
// })
// app.get('/*',(req,res) => {
//     res.sendFile(path.join(__dirname, './dist/index.html'))
// })

app.use('/',routerNavigation)
app.listen( port , () => {
    console.log(`app running on port ${port}`)
})