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

<<<<<<< HEAD

=======
>>>>>>> 3bdb6d5e1f6eebfdf269cbe22ab604e75bbec381
app.use(express.static('asset/img/'))
app.use(express.static('src/views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const { port }  = require('./src/helpers/env')
app.use(cors())

<<<<<<< HEAD
app.use(express.static(path.join(__dirname, './dist')))
app.use('*',(req,res) => {
    res.sendFile(__dirname, './dist/index.html')
})
=======
// app.use(express.static(path.join(__dirname, './dist')))
// app.use('*',(req,res) => {
//     res.sendFile(__dirname, './dist/index.html')
// })
>>>>>>> 3bdb6d5e1f6eebfdf269cbe22ab604e75bbec381

// app.get('/*', (req,res) => {
//     res.sendFile(path.join(__dirname, './dist/index.html'))
// })


app.use('/',routerNavigation)
app.listen( port , () => {
    console.log(`app running on port ${port}`)
})
