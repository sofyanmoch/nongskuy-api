const express =require('express')
const transaksiControllers = require('../controllers/transaksi')
const router = express.Router()

router
    .get('/getall', transaksiControllers.getAll)
    .post('/insert', transaksiControllers.insert)




module.exports = router