const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new mongoose.Schema({
    name: {type:String, lowercase: true, trim: true },
    isActive: {type:Boolean, default:false},
    maxPrice: {type:Number, default: 0 },
    minPrice: {type:Number, default: 0 },
    unit: {type:Schema.Types.ObjectId, ref:'unit'},
    category: {type:Schema.Types.ObjectId, ref:'category'},
    createdAt: {type:Date,default:Date.now},
})

const item = mongoose.model('item', itemSchema)

count = async () => {
    if (await  item.countDocuments() > 0) return
        Promise.all([
            item.create({ 
                
             }),
          ]).then(() => console.log(' item Created')).catch(() => console.log('Failed!'))  
};
  count()

module.exports = item