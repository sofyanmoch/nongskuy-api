const express = require('express')
const historyControllers = require('../controllers/history')

const router = express.Router()

router
.get('/getall', historyControllers.getAll)
.get('/getdetail/:invoice_history',historyControllers.getDetail)
.post('/add', historyControllers.addHistory)
.put('/edit/:invoice_history', historyControllers.update)
.delete('/delete/:invoice_history', historyControllers.delete)

module.exports = router