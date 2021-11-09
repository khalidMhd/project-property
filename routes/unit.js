const express = require('express')
const router = express.Router()
const loginRequire = require('../middleware/requireLogin')
const unitModel = require('../models/unit')

router.post('/api/unit',loginRequire, function (req, res, next) {
    const {name, description, isActive} = req.body
    if (!name, !description) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }
    else {
        unitModel.findOne({name:name}).then(saveunit => {
            if (saveunit) {
                return res.status(422).json({ error: "unit already Exist" })
            } else {
                const unitDetails = new unitModel({
                    name: name, 
                    description: description,
                    isActive:isActive
                })
                unitDetails.save()
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


router.get('/api/unit',loginRequire, (req, res, next) => {
    unitModel.find({}).sort("-createdAt")
    .then(data => {
        if (data == '') {
            return res.json({ message: 'Data Not Found!' })
        } else {
            return res.status(200).json({"unit":data})
        }
    }).catch(error => {
        console.log(error);
    })
})

router.delete('/api/unit/:id', loginRequire, (req,res) => {
    const unitId = req.params.id
    unitModel.findByIdAndDelete({_id: unitId}).then(data => {
        if (data) {
            return res.status(200).json({ message: 'Deleted Successfully!' });
        } else {
            return res.status(500).json({ message: ' Error in Deletion.' });
        }
    })
})

router.put('/api/unit/:id',loginRequire, async (req, res) => {
    const unitId = req.params.id;
    const unit = await unitModel.findById(unitId);
    if (unit) {
        unit.name = req.body.name;
        unit.description = req.body.description;
        unit.isActive = req.body.isActive;

        const updatedunit =await unit.save();
        if (updatedunit) {
            return res
                .status(200)
                .send({ message: 'unit Updated', data: updatedunit });
        }
    }
    return res.status(500).send({ message: ' Error in Updating unit.' });
});

module.exports = router