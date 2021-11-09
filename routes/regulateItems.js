const express = require('express')
const router = express.Router()
const loginRequire = require('../middleware/requireLogin')
const regulateItemModel = require('../models/regulateItems')

router.post('/api/regulate/item', loginRequire, function (req, res, next) {
    const { name, itemId, minPrice, maxPrice } = req.body

    const regulateItemDetails = new regulateItemModel({
        name: name,
        itemId: itemId,
        minPrice: minPrice,
        maxPrice: maxPrice,
    })
    regulateItemDetails.save().then(result => {
        res.status(200).send(result)
    }).catch(err => {
        console.log(err);
    })
});

router.get('/api/regulate/item', loginRequire, (req, res, next) => {
    regulateItemModel.find({}).populate("unit", "name").sort("-createdAt")
        .then(data => {
            if (data == '') {
                return res.json({ message: 'Data Not Found!' })
            } else {
                return res.status(200).json({ "regulate": data })
            }
        }).catch(error => {
            console.log(error);
        })
})

router.get('/api/regulate/item/:id', loginRequire, (req, res, next) => {
    regulateItemModel.find({ itemId: req.params.id }).populate("unit", "name").sort("-createdAt")
        .then(data => {
            if (data.length === 0) {
                return res.json({ message: 'Data Not Found!' })
            } else {
            var ManageData = []
            var name = null;
            var minPrice = null;
            var maxPrice = null;
            var createdAt = null;
            var _id = null;
            var unit = null;
            var itemId = null;
            var categoryId = null;

            for (let i = 0; i < data?.length; i++) {
                minPrice = data[i]?.minPrice
                maxPrice = data[i]?.maxPrice
                _id = data[i]?._id
                createdAt = data[i]?.createdAt
                ManageData.push({ _id, minPrice, maxPrice, createdAt })
            }
                return res.status(200).json({ "items": ManageData })
            }
        }).catch(error => {
            console.log(error);
        })
})

router.get('/api/regulate/itembydate/:date', loginRequire, async (req, res, next) => {
    const { categoryId } = req.body
    regulateItemModel.find({ categoryId }).populate("unit", "name").then(data => {
        if (data.length === 0) {
            console.log("data", data);
            return res.json({ message: 'Data Not Found!' })
        } else {
            const selectDate = data.filter((element) => {
                const setDate = new Date(element.createdAt).toLocaleDateString()
                const paramsDate = new Date(req.params.date).toLocaleDateString()
                return new Date(setDate).getTime() >= new Date(paramsDate).getTime()
            })
            const ids = selectDate.map(o => o.itemId)
            const filtered = selectDate.filter(({ itemId }, index) => !ids.includes(itemId, index + 1))
            return res.status(200).json({ "items": filtered })
        }
    }).catch(error => {
        console.log(error);
    })
})

router.get('/api/regulate/date/:date', loginRequire, async (req, res, next) => {
    const { categoryId } = req.body
    let selectDate = new Date(req.params.date);
    selectDate.setDate(selectDate.getDate() + 1);

    regulateItemModel.find({
        createdAt: {
            $gte: new Date("2020-09-02"),
            $lt: new Date(selectDate)
        }
    }).then(data => {
        if (data.length === 0) {
            console.log("data", data);
            return res.json({ message: 'Data Not Found!' })
        } else {
            const filtereCategory = data.filter(item => {
                return item.categoryId === categoryId
            })

            const ids = filtereCategory.map(o => o.itemId)
            const filtered = filtereCategory.filter(({ itemId }, index) => !ids.includes(itemId, index + 1))

            return res.status(200).json({ "items": filtered })
        }
    }).catch(error => {
        console.log(error);
    })
})


module.exports = router