const express = require('express')
const router = express.Router()
const loginRequire = require('../middleware/requireLogin')
const categoryModel = require('../models/category')

router.post('/api/category',loginRequire, function (req, res, next) {
    const {name, description, isActive} = req.body
    if (!name, !description) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }
    else {
        categoryModel.findOne({name:name}).then(saveCategory => {
            if (saveCategory) {
                return res.status(422).json({ error: "Category already Exist" })
            } else {
                const categoryDetails = new categoryModel({
                    name: name, 
                    description: description,
                    isActive:isActive
                })
                categoryDetails.save()
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


router.get('/api/category',loginRequire, (req, res, next) => {
    categoryModel.find({}).sort("-createdAt")
    .then(data => {
        if (data == '') {
            return res.json({ message: 'Data Not Found!' })
        } else {
            return res.status(200).json({"category":data})
        }
    }).catch(error => {
        console.log(error);
    })
})

router.delete('/api/category/:id', loginRequire, (req,res) => {
    const categoryId = req.params.id
    categoryModel.findByIdAndDelete({_id: categoryId}).then(data => {
        if (data) {
            return res.status(200).json({ message: 'Deleted Successfully!' });
        } else {
            return res.status(500).json({ message: ' Error in Deletion.' });
        }
    })
})

router.put('/api/category/:id',loginRequire, async (req, res) => {
    const categoryId = req.params.id;
    const category = await categoryModel.findById(categoryId);
    if (category) {
        category.name = req.body.name;
        category.description = req.body.description;
        category.isActive = req.body.isActive;

        const updatedCategory =await category.save();
        if (updatedCategory) {
            return res
                .status(200)
                .send({ message: 'Category Updated', data: updatedCategory });
        }
    }
    return res.status(500).send({ message: ' Error in Updating Category.' });
});

module.exports = router