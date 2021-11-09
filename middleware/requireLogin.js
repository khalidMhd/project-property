var jwt = require('jsonwebtoken');
const mongoose =  require('mongoose')
const userModel = require('../models/user')

 const loginRequire = (req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization) {
       return res.status(401).json({error: "You must be login."})
    }
    const token =  authorization.replace('Bearer ',"")
     jwt.verify(token,"12",(err,payload)=>{
         if(err) {
           return res.status(401).json({error: "You must be login first"})
         }
         const {_id} = payload
         userModel.findById(_id).then(userData=>{
             req.user = userData
             next()
         })
         
     })
}

const userId = (req,res, next) => {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization, decoded;
        try {
            decoded = jwt.verify(authorization, "12");
            next()
        } catch (e) {
            return res.status(401).send({ message: 'unauthorized User' });
        }
    }
}

module.exports = loginRequire, userId