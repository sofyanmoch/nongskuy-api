const categoryModel = require('../models/category')
const response = require('../helpers/response')

const category = {
    getAll: (req,res) => {
        categoryModel.getAll()
        .then((result)=>{
            response.success(res,result,"Get all Category success")
        })
        .catch((err)=>{
            response.failed(res,[],err.message)
        })
    },
    getDetail: (req,res) => {
        const id  =req.params.id_category
        categoryModel.getDetail(id)
        .then((result)=>{
            response.success(res,result,"Get Detail history success")
        })
        .catch((err)=>{
            response.failed(res,[],err.message)
        })
    },
    insert: (req,res) => {
        const body = req.body
        categoryModel.insert(body)
        .then((result)=>{
            response.success(res,result,"Add Category success")
        })
        .catch((err)=>{
            response.failed(res,[],err.message)
        })
    },
    update: (req,res) => {
        const data = req.body
        const id = req.params.id_category
        categoryModel.update(data,id)
        .then((result)=>{
            response.success(res,result,"Update Category success")
        })
        .catch((err)=>{
            response.failed(res,[],err.message)
        })
    },
    delete: (req,res) => {
        const id = req.params.id_category
        categoryModel.delete(id)
        .then((result)=>{
            response.success(res,result,"Delete history success")
        })
        .catch((err)=>{
            response.failed(res,[],err.message)
        })
    }
}

module.exports = category