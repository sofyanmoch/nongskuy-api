const transaksiModel = require('../models/transaksi')
const {success,failed,tokenResult} = require('../helpers/response')


const transaksi = {
    getAll: async(req,res) => {
        transaksiModel.getAll().then((response)=> {
                success(res,response,'Get Transaksi Success')
        }).catch((err)=>{
            console.log(err)
        })
        },
    insert: async(req,res) => {
    const data = req.body
    transaksiModel.insertMaster(data).then((response)=> {
        const idMaster = response.insertId
        const insertDetail = data.detail.map((item)=> {
            item.id_transaksi = idMaster
           transaksiModel.insertDetail(item)
        })
        Promise.all(insertDetail).then(()=>{
            success(res,response,'Insert Transaksi Success')
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
    }
}

module.exports = transaksi