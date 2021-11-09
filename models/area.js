const mongoose = require('mongoose')

const areaSchema = new mongoose.Schema({
    name: {type:String, lowercase: true, trim: true},
    description: {type:String},
    isActive: {type:Boolean, default:false},
    createdAt: {type:Date,default:Date.now},
})

const area = mongoose.model('area', areaSchema)

count = async () => {
    if (await  area.countDocuments() > 0) return
        Promise.all([
            area.create({ 
                
             }),
          ]).then(() => console.log(' area Created')).catch(() => console.log('Failed!'))  
};
  count()

module.exports = area