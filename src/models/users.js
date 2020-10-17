const db = require('../configs/db')

const users = {
    register: (data) => {
    return new Promise((resolve,reject)=>{
            db.query(`INSERT INTO users SET ?`,data,(err,result)=>{
                err ? reject(new Error(err)) : resolve(result)
            })
        })
    },
    update: (email) => {
        return new Promise((resolve, reject)=>{
            db.query(`UPDATE users SET user_status = 1 WHERE email = '${email}'`,(err,result)=>{
                if(err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    login: (data) => {
        return new Promise((resolve,reject)=>{
                db.query(`SELECT * from users where email = ?`, data.email,(err,result)=>{
                    err ? reject(new Error(err)) : resolve(result)
                })
            })
        },
    getEmail: (email) =>{
        return new Promise((resolve,reject) => {
            db.query(`SELECT * from users where email = '${email}'`,(err,result)=>{
                err?reject(new Error(err)) : resolve(result)
            })
        })
    },
    updRefreshToken: (token,id) => {
        return new Promise((resolve,reject) => {
            db.query(`UPDATE users SET refreshToken = '${token}' WHERE id = '${id}'`,(err,result)=> {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
}

module.exports = users