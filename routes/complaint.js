const express = require('express')
const router = express.Router()
const loginRequire = require('../middleware/requireLogin')
const complaintModel = require('../models/complaint')
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/uploads')
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
}) 

var upload = multer({
    storage: storage,
})

router.post('/api/complaint', loginRequire,upload.single('image'), function (req, res, next) {
    const { name, contactNo, detail } = req.body
    if (!name, !contactNo, !detail) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }
    else {
        const complaintDetails = new complaintModel({
            name: name,
            contactNo: contactNo,
            detail: detail
        })
        if (req.file !== undefined) {
            complaintDetails.image = req.file.path
        }
        complaintDetails.save()
            .then(result => {
                res.status(200).send({ message: "Complaint Send Successfully!", result })
            }).catch(err => {
                console.log(err);
            })
    }
});


router.get('/api/complaint', loginRequire, (req, res, next) => {
    complaintModel.find({}).sort("-createdAt")
        .then(data => {
            if (data == '') {
                return res.json({ message: 'Data Not Found!' })
            } else {
                return res.status(200).json({ "complaint": data })
            }
        }).catch(error => {
            console.log(error);
        })
})


module.exports = router