const redis = require('redis')
const {success} = require('./response')
const redisClient = redis.createClient()
const _ = require('lodash')


module.exports = {
    getAll: (req,res,next) => {
        redisClient.get('produks',(err,data) => {
            if(data){
        data = JSON.parse(data)
        const sortby =  !req.query.sortby?'id': req.query.sortby
        const name = !req.query.name ? null : req.query.name
        const type = !req.query.type ? "ASC" : req.query.type;
        const limit = !req.query.limit ? 9 : parseInt(req.query.limit)
        const page = !req.query.page ? 1 : parseInt(req.query.page)

        const startPage = (page -1) * limit
        const lastPage = page * limit

        const sort = _.orderBy(data,[sortby],[type])
        let dataRedis = sort

        if(name !== null) {
          const search = sort.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
          dataRedis = search
        }
        res.send({
          message: 'Success Get Product From Redis',
          success: true,
          data: dataRedis.slice(startPage, lastPage)
        })
            }else{
                next()
            }
        })    
    }
}

// const dataRedis = JSON.parse(data)
//                 const search = !req.query.search?'':req.query.search
//                 const sortby = !req.query.sortby?'id':req.query.sortby
//                 const sortType = !req.query.sortType?'asc':req.query.sortType
//                 // const output = _.filter(dataRedis,(obj) => {
//                 //     return obj.name.includes(search)
//                 // })
//                 const limit = !req.query.limit?2:parseInt(req.query.limit)
//                 const page = !req.query.page?1:req.query.page
//                 const start = page === 1?0:(page*limit)-limit
//                 const offset = start=== 0?limit:start*limit
//                 // const output = _.orderBy(dataRedis,[sortby],[sortType])
//                 const output = _.slice(dataRedis,start,offset)
//                 success(res,output,'Get produks from redis')
