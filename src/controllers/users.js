const usersModel = require('../models/users')
const {success,failed,tokenResult} = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secretKey } = require('../helpers/env')
const { getEmail } = require('../models/users')
const users = {
    register: async(req,res) => {
        try{
        const body = req.body
        const salt =  await  bcrypt.genSalt(10)
        const hashPw = await bcrypt.hash(body.password, salt)
        const data = {
            email: body.email,
            password: hashPw
        }
        const email = await getEmail(data.email)
        if(email.length > 0) {
            failed(res,[],'Email already exist')
        } else {
        usersModel.register(data)
        .then((result)=>{
            tokenResult(res,result,"Register Success")
        })
    }
    } catch (err){
        failed(res,[],err.message)
    }
    },
    login: async(req,res) => {
        try{
        const body = req.body
        usersModel.login(body)
        .then(async(result)=>{
            const results = result[0]
            if(!results){
                failed(res,[],'Email Not Registered')
            } else {
            const id = results.id
            const password = results.password
            const email = results.email
            const isMatch = await bcrypt.compare(body.password,password)
            if(isMatch){
                jwt.sign({
                    email:results.email,
                  }, secretKey, { expiresIn: 3600 },
                 (err,token) => {
                     if(err){
                         console.log(err)
                     }else{
                         const id = results.id
                         const refreshToken = jwt.sign({id},'REFRESH17')
                        //  console.log(id)
                        //  console.log(token)
                        //  console.log(refreshToken)
                        usersModel.updRefreshToken(refreshToken,id).then(() => {
                            const data = {
                                token:token,
                                refreshToken: refreshToken
                            }
                            tokenResult(res, data,"Login Success")
                        }).catch((err)=> {
                            console.log(err)
                        })
                     }
                 } 
            )

            }else{
                failed(res,[], 'Wrong Password') 
            }
        }
        })
    } catch (err){
        failed(res,[],err.message)
    }
    }
}

module.exports = users