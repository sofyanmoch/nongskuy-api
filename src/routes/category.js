const express = require('express')
const categoryControllers = require('../controllers/category')

const router = express.Router()

router
.get('/getall', categoryControllers.getAll)
.get('/getdetail/:id_category', categoryControllers.getDetail)
.post('/add', categoryControllers.insert)
.put('/edit/:id_category', categoryControllers.update)
.delete('/delete/:id_category', categoryControllers.delete)

module.exports = router