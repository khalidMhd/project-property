const express = require('express')
const router = express.Router()
var bcrypt = require('bcryptjs');
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const loginRequire = require('../middleware/requireLogin')
const userId = require('../middleware/requireLogin')

router.get('/api/user', loginRequire, (req, res, next) => {
    userModel.find({}).sort({
        created_at: -1
    }).select("-password")
        .then(data => {
            if (data == '') {
                return res.json({
                    message: 'Data Not Found!'
                })
            } else {
                return res.status(200).json(data)
            }
        }).catch(error => {
            console.log(error);
        })
})

router.put('/api/update/password', loginRequire, async (req, res) => {

    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization,
            decoded;
        const token = authorization.replace('Bearer ', "")

        try {
            decoded = jwt.verify(token, "12");
        } catch (e) {
            return res.status(401).send({
                message: 'unauthorized User'
            });
        }

        const {
            currentPassword,
            updatePassword
        } = req.body
        var hashPassword = await bcrypt.hash(updatePassword, 12)

        userModel.findOne({
            _id: decoded._id
        })
            .then(savedUser => {
                if (!savedUser) {
                    return res.status(422).json({
                        error: "Invalid User"
                    })
                }
                bcrypt.compare(currentPassword, savedUser.password)
                    .then(doMatch => {
                        if (doMatch) {
                            savedUser.password = hashPassword;
                            const user = savedUser.save();
                            if (user) {
                                res.status(200).json({
                                    message: "Password Updated Successfully",
                                })
                            }
                        } else {
                            return res.status(422).json({
                                error: "Current Password Is Not Valid"
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            })
    }


});

router.post('/api/signup', (req, res) => {
    const {
        name,
        email,
        type,
        password
    } = req.body

    if (!name || !email || !type || !password) {
        return res.status(422).json({
            error: "Please fill all the fields"
        })
    } else {
        userModel.findOne({
            email: email
        }).then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({
                    error: "User already Exist"
                })
            } else {
                bcrypt.hash(password, 12).then(password => {
                    const userDetails = new userModel({
                        name: name,
                        email: email,
                        userType: type,
                        password: password,
                    })

                    userDetails.save()
                        .then(user => {
                            console.log(user);
                            res.status(200).json({
                                message: "successfully signed in"
                            })
                        })
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
})

router.post('/api/signin', (req, res) => {
    const { email,password } = req.body

    if (!email || !password) {
        return res.status(422).json({
            error: "please fill all the fields"
        })
    }
    userModel.findOne({
        email: email
    })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({
                    error: "Invalid email or password"
                })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const access_token = jwt.sign({ _id: savedUser._id }, '12')
                        const { _id, name, email } = savedUser
                        res.status(200).json({ "data": { access_token, _id, name, email } })
                    } else {
                        return res.status(422).json({
                            error: "Invalid email or password"
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})



module.exports = router