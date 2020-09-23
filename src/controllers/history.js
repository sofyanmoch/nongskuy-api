const historyModel = require('../models/history')
const response = require('../helpers/response')

const history = {
    getAll: (req,res) => {
        const sortby = !req.query.sortby?'id': req.query.sortby
        const type = !req.query.type? "ASC" :req.query.type 
        const name = !req.query.name ? "" : req.query.name
        const limit = !req.query.limit? 4 : parseInt(req.query.limit)
        const page = !req.query.page? 1 : parseInt(req.query.page)
        const offset = page ===1 ? 0:(page-1)*limit
        historyModel.getAll(name,limit,offset,sortby,type)
        .then((result) => {
            response.success(res,result,"Get all History success")
        })
        .catch((err)=>{
            response.failed(res,[],err.message)
        })
    },
    getDetail: (req,res) => {
        const invoice  =req.params.invoice_history
        historyModel.getDetail(invoice)
        .then((result)=>{
            response.success(res,result,"Get Detail history success")
        })
        .catch((err)=>{
            response.failed(res,[],err.message)
        })
    },
    addHistory: (req,res) => {
        const data =req.body
        historyModel.addHistory(data)
        .then((result)=>{
            response.success(res,result,"Add History success")
        })
        .catch((err)=>{
            response.failed(res,[],err.message)
        })
    },
    update: (req,res) => {
        const data =req.body
        const invoice = req.params.invoice_history
        historyModel.update(data,invoice)
        .then((result)=>{
            response.success(res,result,"Update History success")
        })
        .catch((err)=>{
            response.failed(res,[],err.message)
        })
    },
    delete: (req,res) => {
        const invoice = req.params.invoice_history
        historyModel.delete(invoice)
        .then((result)=>{
            response.success(res,result,"Delete history success")
        })
        .catch((err)=>{
            response.failed(res,[],err.message)
        })
    }
}

module.exports = history