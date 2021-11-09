const express = require('express')
const router = express.Router()
const loginRequire = require('../middleware/requireLogin')
const paginatedResults = require('../middleware/pagination')
const itemModel = require('../models/item')
const regulateItemModel = require('../models/regulateItems')

router.get('/api/pg', paginatedResults(itemModel), async (req, res, next) => {
    var items = []
    var name = null;
    var createdAt = null;
    var _id = null;
    var isActive = null;
    var unit = null;
    var unitId = null;
    var category = null;
    var categoryId = null;
    for (let i = 0; i < res.paginatedResults.results?.length; i++) {
        name = res.paginatedResults.results[i]?.name
        _id = res.paginatedResults.results[i]?._id
        isActive = res.paginatedResults.results[i]?.isActive
        createdAt = res.paginatedResults.results[i]?.createdAt
        unit = res.paginatedResults.results[i]?.unit?.name
        unitId = res.paginatedResults.results[i]?.unit?._id
        category = res.paginatedResults.results[i]?.category?.name;
        categoryId = res.paginatedResults.results[i]?.category?._id;
        await items.push({ _id, name, isActive, createdAt, unit, unitId, category, categoryId })
    }
    return res.status(200).json({ "next": res.paginatedResults.next, "previous": res.paginatedResults?.previous, items })
})

router.post('/api/items', loginRequire, async function (req, res, next) {
    const { name, unitId, categoryId, isActive, minPrice, maxPrice } = req.body
    console.log(unitId);
    if (!name, !unitId, !categoryId, !minPrice, !maxPrice) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }
    else {
        itemModel.findOne({ name: name }).then(saveItem => {
            if (saveItem) {
                return res.status(422).json({ error: "item already Exist" })
            } else {
                const itemDetails = new itemModel({
                    name: name,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    categoryId: categoryId,
                    unit: unitId,
                    category: categoryId,
                    isActive: isActive
                })
                itemDetails.save().then(result => {

                    res.status(200).send(result)
                    if (result._id) {
                        const regulateDetails = new regulateItemModel({
                            name: name,
                            unitId: unitId,
                            categoryId: categoryId,
                            itemId: result._id,
                            minPrice: minPrice,
                            maxPrice: maxPrice,
                        })
                        regulateDetails.save()
                    }

                }).catch(err => {
                    console.log(err);
                })
            }

        }).catch(err => {
            console.log(err);
        })
    }
});

router.get('/api/items', loginRequire, (req, res, next) => {
    itemModel.find({}).sort("-createdAt").populate("category unit", "name")
        .then(data => {
            if (data === '') {
                return res.json({ message: 'Data Not Found!' })
            } else {
                var item = []
                var name = null;
                var minPrice = null;
                var maxPrice = null;
                var createdAt = null;
                var _id = null;
                var isActive = null;
                var unit = null;
                var unitId = null;
                var category = null;
                var categoryId = null;
                for (let i = 0; i < data?.length; i++) {
                    name = data[i]?.name
                    minPrice = data[i]?.minPrice
                    maxPrice = data[i]?.maxPrice
                    _id = data[i]?._id
                    isActive = data[i]?.isActive
                    createdAt = data[i]?.createdAt
                    unit = data[i]?.unit?.name
                    unitId = data[i]?.unit?._id
                    category = data[i]?.category?.name;
                    categoryId = data[i]?.category?._id;
                    item.push({ _id, name, minPrice, maxPrice, isActive, createdAt, unit, unitId, category, categoryId })
                }
                return res.status(200).json({ "items": item })
            }
        }).catch(error => {
            console.log(error);
        })
})

router.get('/api/items/:categoryId/:date', loginRequire, async (req, res, next) => {
    let selectDate = new Date(req.params.date);
    selectDate.setDate(selectDate.getDate() + 1);

    regulateItemModel.find({
        createdAt: {
            $gte: new Date("2020-09-02"),
            $lt: new Date(selectDate)
        }
    }).populate("unit", "name").then(data => {
        if (data.length === 0) {
            return res.json({ message: 'Data Not Found!' })
        } else {
            const filtereCategory = data.filter(item => {
                return item.categoryId === req.params.categoryId
            })
            const ids = filtereCategory.map(o => o.itemId)
            const filtered = filtereCategory.filter(({ itemId }, index) => !ids.includes(itemId, index + 1))

            var filteredManageData = []
            var name = null;
            var minPrice = null;
            var maxPrice = null;
            var createdAt = null;
            var _id = null;
            var unit = null;
            var itemId = null;
            var categoryId = null;

            for (let i = 0; i < filtered?.length; i++) {
                name = filtered[i]?.name
                minPrice = filtered[i]?.minPrice
                maxPrice = filtered[i]?.maxPrice
                _id = filtered[i]?._id
                createdAt = filtered[i]?.createdAt
                unit = filtered[i]?.unit?.name
                categoryId = filtered[i]?.categoryId
                itemId = filtered[i]?.itemId
                filteredManageData.push({ _id, name, minPrice, maxPrice, createdAt, unit,itemId, categoryId })
            }

            return res.status(200).json({ "items": filteredManageData })
        }
    }).catch(error => {
        console.log(error);
    })
})

router.get('/api/items/:categoryId', loginRequire, async (req, res, next) => {
    let categoryId = req.params.categoryId;

    itemModel.find({category:categoryId, isActive: true}).sort("-createdAt").populate("category unit", "name").then(data => {
        if (data.length === 0) {
            return res.json({ message: 'Data Not Found!' })
        } else {
    
            var filteredManageData = []
            var name = null;
            var minPrice = null;
            var maxPrice = null;
            var createdAt = null;
            var _id = null;
            var unit = null;
            var itemId = null;
            var categoryId = null;

            for (let i = 0; i < data?.length; i++) {
                name = data[i]?.name
                minPrice = data[i]?.minPrice
                maxPrice = data[i]?.maxPrice
                createdAt = data[i]?.createdAt
                unit = data[i]?.unit?.name
                category = data[i]?.category.name
                categoryId = data[i]?.category._id
                itemId = data[i]?._id
                filteredManageData.push({ name, minPrice, maxPrice, createdAt, unit,itemId, category, categoryId })
            }

            return res.status(200).json({ "items": filteredManageData })
        }
    }).catch(error => {
        console.log(error);
    })
})


router.delete('/api/items/:id', loginRequire, (req, res) => {
    const itemId = req.params.id
    itemModel.findByIdAndDelete({ _id: itemId }).then(data => {
        if (data) {
            return res.status(200).json({ message: 'Deleted Successfully!' });
        } else {
            return res.status(500).json({ message: ' Error in Deletion.' });
        }
    })
})

router.put('/api/items/:id', loginRequire, async (req, res) => {
    const itemId = req.params.id;
    const { name, unitId, categoryId, isActive, minPrice, maxPrice } = req.body
    console.log(unitId);
    const item = await itemModel.findById(itemId);
    if (item) {
        item.name = name;
        item.minPrice = minPrice;
        item.maxPrice = maxPrice;
        item.unit = unitId;
        item.category = categoryId;
        item.isActive = isActive;

        const updatedItem = await item.save();
        if (updatedItem) {
            if (item.minPrice !== minPrice || item.maxPrice !== maxPrice) {
                const regulateDetails = new regulateItemModel({
                    name: name,
                    unit: unitId,
                    categoryId: categoryId,
                    itemId: itemId,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                })
                regulateDetails.save()
            }
            return res.status(200).send({ message: 'item Updated', data: updatedItem });
        }
    }
    return res.status(500).send({ message: ' Error in Updating item.' });
});

module.exports = router