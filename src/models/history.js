const db = require('../configs/db')

const history = {
    getAll: (name,limit,offset,sortby,type) => {
        return new Promise((resolve,reject) => {
            db.query(`select history.invoice , history.orders , cashier.cashier_name, history.amount from history INNER JOIN cashier ON history.cashier_id = cashier.id where cashier_name LIKE '%${name}%' ORDER BY ${sortby} ${type} LIMIT ${offset},${limit}`,(err,result)=> {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    getDetail: (invoice) => {
        return new Promise((resolve,reject) => {
            db.query(`select history.invoice , history.orders , cashier.cashier_name, history.amount from history INNER JOIN cashier ON history.cashier_id = cashier.id where history.invoice='${invoice}'`,(err,result)=> {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    addHistory: (data) => {
        return new Promise((resolve,reject) => {
            db.query(`INSERT INTO history (invoice,cashier_id,amount,orders)VALUES('${data.invoice}','${data.cashier_id}','${data.amount}','${data.orders}')`,(err,result) => {
                err ? reject(new Error(err)) : resolve(result)
            })
        })
    },
   update: (data,invoice) => {
            return new Promise((resolve,reject)=> {
                db.query(`update history set 
            orders = '${data.orders}',
            cashier_id='${data.cashier_id}',
            amount = '${data.amount}'
            where invoice = '${invoice}'`
            ,(err,result)=>{
                !err ? resolve(result) : reject(new Error(err))
            })
        })
    },
    delete: (invoice) => {
        return new Promise((resolve,reject) => {
            db.query(`delete from history
            where invoice = '${invoice}'
            `,(err,result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
}

module.exports = history