const usersModel = require('../models/users')
const {success,failed,tokenResult} = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('../helpers/env')
const { secretKey } = require('../helpers/env')
const { getEmail } = require('../models/users')
const nodemailer = require('nodemailer')
const {emailSend} = require('../helpers/Mail')
// const sendMail  = require('../helpers/Mail')

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
        await usersModel.register(data)
        .then((result)=>{
            tokenResult(res,result,"Register Success Please checky your email to activation")
            const token = jwt.sign({email: body.email}, env.secretKey)
            emailSend(data.email,token)
        }).catch((err)=>{
            failed(res,[],err.message)
        })
    }
    } catch (err){
        failed(res,[],err.message)
    }
    },
    verify: async(req,res) => {
            const token = req.params.token
            if(token){
                jwt.verify(token, secretKey, async (err,decode)=>{
                    if(err) {
                        failed(res,[],err.message)
                    } else {
                        try {
                            const data = jwt.decode(token)
                            const email = data.email
                            const result = await usersModel.update(email)
                            if(result){
                                res.render("verify/email")
                            } else {
                                res.json({
                                    message: 'error Activated'
                                })
                            }
                        } catch (err) {
                            failed(res, [], err.message)
                        }
                    }
                })
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
            }
            else if (results.user_status === 0) {
                failed(res,[],'Please Activate Email First')
            }
            else {
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