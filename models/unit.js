const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema({
    name: {type:String, lowercase: true, trim: true},
    description: {type:String},
    isActive: {type:Boolean, default:false},
    createdAt: {type:Date,default:Date.now},
})

const unit = mongoose.model('unit', unitSchema)

count = async () => {
    if (await  unit.countDocuments() > 0) return
        Promise.all([
            unit.create({ 
                
             }),
          ]).then(() => console.log(' unit Created')).catch(() => console.log('Failed!'))  
};
  count()

module.exports = unit