const express = require('express')
const router = express.Router()
const loginRequire = require('../middleware/requireLogin')
const areaModel = require('../models/area')

router.post('/api/area',loginRequire, function (req, res, next) {
    const {name, description, isActive} = req.body
    if (!name, !description) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }
    else {
        areaModel.findOne({name:name}).then(savearea => {
            if (savearea) {
                return res.status(422).json({ error: "Area Already Exist" })
            } else {
                const areaDetails = new areaModel({
                    name: name, 
                    description: description,
                    isActive:isActive
                })
                areaDetails.save()
                .then(result => {
                    res.status(200).send(result)
                }).catch(err => {
                    console.log(err);
                })
            }

        }).catch(err => {
            console.log(err);
        })
       
    }
});


router.get('/api/area',loginRequire, (req, res, next) => {
    areaModel.find({}).sort("-createdAt")
    .then(data => {
        if (data == '') {
            return res.json({ message: 'Data Not Found!' })
        } else {
            return res.status(200).json({"area": data})
        }
    }).catch(error => {
        console.log(error);
    })
})

router.delete('/api/area/:id', loginRequire, (req,res) => {
    const areaId = req.params.id
    areaModel.findByIdAndDelete({_id: areaId}).then(data => {
        if (data) {
            return res.status(200).json({ message: 'Deleted Successfully!' });
        } else {
            return res.status(500).json({ message: ' Error in Deletion.' });
        }
    })
})

router.put('/api/area/:id',loginRequire, async (req, res) => {
    const areaId = req.params.id;
    const area = await areaModel.findById(areaId);
    if (area) {
        area.name = req.body.name;
        area.description = req.body.description;
        area.isActive = req.body.isActive;

        const updatedarea =await area.save();
        if (updatedarea) {
            return res
                .status(200)
                .send({ message: 'area Updated', data: updatedarea });
        }
    }
    return res.status(500).send({ message: ' Error in Updating area.' });
});

module.exports = router