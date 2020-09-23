const db = require('../configs/db')

const transaksi = {
    getAll: () => {
        return new Promise((resolve,reject)=> {
            db.query(`SELECT * from transaksi`,(err,result)=> {
                err?reject(new Error(err)):resolve(result)
            })
        })
    },
    insertMaster: (data) => {
        return new Promise((resolve,reject)=> {
            db.query(`INSERT into transaksi (invoice,cashier)VALUES('${data.invoice}','${data.cashier}')`,(err,result)=> {
                err?reject(new Error(err)):resolve(result)
            })
        })
    },
    insertDetail: (data) => {
        return new Promise((resolve,reject)=> {
            db.query(`INSERT into transaksi_detail SET ?`,data ,(err,result)=> {
                err?reject(new Error(err)):resolve(result)
            })
        })
    }
}

module.exports = transaksi