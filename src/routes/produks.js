const express =require('express')
const produksControllers = require('../controllers/produks')
const { authentication, authorization } = require('../helpers/auth')
// const cors = require('cors')

// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
const redis = require('../helpers/redis')   
const upload = require('../helpers/upload')
const router = express.Router()

router
.get('/getall',  authentication, authorization,redis.getAll, produksControllers.getAll)
.get('/getall', authentication, authorization, redis.getAll, produksControllers.getAll)
.get('/getdetail/:id_produks', authentication, authorization,produksControllers.getDetail)
.post('/add',authentication, authorization, produksControllers.addProduk)
.put('/edit/:id_produks',upload.single('image'), authentication, authorization,produksControllers.update)
.patch('/edit/:id_produks', upload.single('image'), authentication, authorization,produksControllers.updPatch)
.delete('/delete/:id_produks',authentication, authorization,produksControllers.delete)


module.exports = router
