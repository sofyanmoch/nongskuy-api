const db = require('../configs/db')
const fs = require('fs')

const produks = {
    getAll: (name,limit,offset,sortby,type) => {
        return new Promise((resolve,reject)=>{
            db.query(`select produk.id , produk.name , produk.price , categories.category_name ,produk.image from produk INNER JOIN categories ON produk.category_id = categories.id where name LIKE '%${name}%' ORDER BY ${sortby} ${type} LIMIT ${offset},${limit} `,(err,result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }  
            })
        })
    },
    getAllData: () => {
        return new Promise((resolve,reject)=>{
            db.query(`SELECT *, (SELECT COUNT (*) from produk) as count from produk`,(err,result) => {
                !err? reject(new Error(err)):resolve(result)
            })
        })
    },
    getDetail: (id) => {
        return new Promise((resolve,reject)=>{
            db.query(`SELECT produk.id , produk.name , produk.price , categories.category_name ,produk.image FROM produk INNER JOIN categories ON produk.category_id = categories.id WHERE produk.id = '${id}'`,(err,result) => {
                err ? reject(new Error(err)) : resolve(result)
            })
        })
    },
    addProduk: (data) => {
    return new Promise((resolve,reject)=>{
            db.query(`insert into produk (name,price,image,category_id)values(
                '${data.name}',
                '${data.price}',
                '${data.image}',
                '${data.category_id}')`,(err,result)=>{
                err ? reject(new Error(err)) : resolve(result)
            })
        })
    },
    update: (data,id) => {
        return new Promise((resolve,reject)=>{
            db.query(`SELECT * FROM produk WHERE id = ${id}`, (err,result) => {
                if(err) {
                    reject(new Error(err))
                }else{
                    resolve(new Promise((resolve,reject) => {
                        let imgOld = result[0].image
                        let imgNew = data.image
                        if(imgOld !== imgNew){
                            fs.unlink(`asset/img/${imgOld}`,(err)=> {
                                if(err){
                                    console.log('Data is empty')
                                }
                                console.log('Delete image success')
                            })
                        }
                        db.query(`update produk set 
                        name = '${data.name}',
                        price='${data.price}',
                        image='${imgNew}',
                        category_id='${data.category_id}' 
                        where id = '${id}'`
                        ,(err,result)=>{
                            !err ? resolve(result) : reject(new Error(err))
                        })
                    }))
                }
            })
         })
    },
    updPatch: (data,id) => {
        return new Promise((resolve,reject)=>{
            db.query(`SELECT * FROM produk WHERE id = ${id}`, (err,result) => {
                if(err) {
                    reject(new Error(err))
                }else{
                    resolve(new Promise((resolve,reject) => {
                        let imgOld = result[0].image
                        let imgNew = data.image
                        if(imgOld !== imgNew){
                            fs.unlink(`asset/img/${imgOld}`,(err)=> {
                                if(err){
                                    console.log('Data is empty')
                                }
                                console.log('Delete image success')
                            })
                        }
                        db.query(`UPDATE produk SET 
                    ? WHERE id = ?`, [data,id]
                    ,(err,result)=>{
                        !err ? resolve(result) : reject(new Error(err))
                    })
                    }))
                }
            })
         })
    },
    delete: (id) => {
        return new Promise((resolve,reject)=>{
                db.query(`SELECT * FROM produk where id = ${id}`,(err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(new Promise((resolve,reject)=> {
                            const imgOld = result[0].image
                            fs.unlink(`asset/img/${imgOld}`,(err)=>{
                                if(err) throw err;
                                console.log(`Image deleted`) 
                            })
                            db.query(`delete from produk where id = '${id}'
                              `,(err,result)=>{
                                err ? reject(new Error(err)) : resolve(result)
                            })
                        }))
                    }
                })
            })
        }                                                       
    }

module.exports = produks