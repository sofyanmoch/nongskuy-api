const db = require('../configs/db')

const category = {
    getAll: () => {
        return new Promise((resolve,reject)=> {
            db.query(`select * from categories`,(err,result)=> {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    getDetail: (id) => {
        return new Promise((resolve,reject) => {
            db.query(`select * from categories where id ='${id}'`,(err,result)=> {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    insert: (data) => {
        return new Promise((resolve,reject)=> {
            db.query(`INSERT into categories(category_name)VALUES('${data.category_name}')`,(err,result)=> {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    update: (data,id) => {
        return new Promise((resolve,reject)=> {
            db.query(`UPDATE categories set category_name = '${data.category_name}' where id = '${id}'`,(err,result) => {
                !err?resolve(result):reject(new Error(err))
            })
        })
    },
    delete: (id) => {
        return new Promise((resolve,reject) => {
            db.query(`delete from categories
            where id = '${id}'
            `,(err,result)=>{
                err? reject(new Error(err)):resolve(result)
            })
        })
    }
}

module.exports = category