const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RefulateItemSchema = new mongoose.Schema({
    name: {type:String},
    unit: {type:Schema.Types.ObjectId, ref:'unit'},
    itemId: {type:String, trim: true},
    categoryId: {type:String, trim: true},
    maxPrice: {type:Number, default: 0 },
    minPrice: {type:Number, default: 0 },
    createdAt: {type:Date,default:Date.now},
})

const regulate = mongoose.model('regulateItems', RefulateItemSchema)

count = async () => {
    if (await  regulate.countDocuments() > 0) return
        Promise.all([
            regulate.create({ 
                
             }),
          ]).then(() => console.log(' Regulate Items Created')).catch(() => console.log('Failed!'))  
};
  count()

module.exports = regulate