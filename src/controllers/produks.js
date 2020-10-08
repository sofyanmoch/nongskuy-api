const produksModel = require('../models/produks')
const response = require('../helpers/response');
const upload = require('../helpers/upload')
const redis = require('redis')
const redisClient = redis.createClient()

const produks = {
    getAll: (req,res) => {
        try {
        const sortby = !req.query.sortby?'id': req.query.sortby
        const type = !req.query.type? "ASC" :req.query.type 
        const name = !req.query.name ? "" : req.query.name
        const limit = !req.query.limit? 10: parseInt(req.query.limit)
        const page = !req.query.page? 1 : parseInt(req.query.page)
        const offset = page === 1 ? 0:(page-1)*limit
        
        produksModel.getAll(name,limit,offset,sortby,type)
        .then((result)=>{
            // redisClient('key','value')
            redisClient.set('produks',JSON.stringify(result))
            response.success(res,result,"Get produks from db success")
        })
    } catch {
        response.failed(res,[],'internal server eror')
    }
},
    getDetail: (req,res) => {
        try {
        const id = req.params.id_produks
        produksModel.getDetail(id)
        .then((result)=>{
            response.success(res,result,"Get detail produks success")
        })
        
    } catch {
            response.failed(res,[],'internal server error')
        }
    },
    addProduk: (req,res) => {
        try{
            upload.single('image')(req,res,(err) => {
                // if(err){
                //     response.failed(res,[],err)
                // }else 
                if(err){
                    if(err.code === 'LIMIT_FILE_SIZE'){
                        response.failed(res,[],'Ukuran file terlalu besar')
                    }else{
                        response.failed(res,[],err)
                    }
                }
                else{
                    const body = req.body
        body.image = !req.file?req.file:req.file.filename
        produksModel.addProduk(body)
        .then((result)=>{
            redisClient.del('produks')
            response.success(res,result,"Add produks success")
        })
        }
    })
    } catch (err){
        response.failed(res,[],err.message)
    }
    },
    update: (req,res) => {
        try {
        const data = req.body
        const id = req.params.id_produks
        data.image = req.file.filename
        produksModel.update(data,id)
        .then((result)=>{
            redisClient.del('produks')
            response.success(res,result,"Update produks success")
        })
    } catch(err) {
        response.failed(res,[],err.message)
    }
    },
    updPatch: (req,res) => {
        try{
        const data = req.body
        const id = req.params.id_produks
        data.image = req.file.filename

        // if(data.image === ""){
        //     data.image === imgOld
        // }

        produksModel.updPatch(data,id)
        .then((result)=>{
            redisClient.del('produks')
            response.success(res,result,"Update produks success")
        })
        } catch (err) {
            response.failed(res,[],err.message)
        }
        
    },
    delete: (req,res) => {
        try {
            const id = req.params.id_produks
        produksModel.delete(id)
        .then((result)=>{
            redisClient.del('produks')
            response.success(res,result,"Delete produks success")
        })
    } catch (err){
        response.failed(res,[],err.message)
    }
        
    }
}

module.exports = produks

// 
// const airlinesModel = require('../../model/airlines')
// const response = require('../../helper/response')

// const airlines = {
//     dataAll: (req,res) => {
//         try {
//             const sortby = !req.query.sortby?'id':req.query.sortby
//             const type = !req.query.type?'ASC': req.query.type
//             const name = !req.query.name?'':req.query.name
//             const limit = !req.query.limit?7:req.query.limit
//             airlinesModel.dataAll().then((result)=>{
//                 response.success(res,result,"Get airlines success")
//             })
//         } catch {
//             response.failed(res,[],'Internal server error')
//         }

        
//     }
// }

// module.exports = airlines
//

// model
// const db = require('.././config/database')

// const airlines = {
//     dataAll: () => {
//         return new Promise((resolve,reject)=> {
//             db.query(`SELECT * from airlines`,(err,result)=>{
//                 if(err){
//                     reject(new Error(err))
//                 }else{
//                     resolve(result)
//                 }
//             })
//         })
//     }
// }

// module.exports = airlines