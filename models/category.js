const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {type:String, lowercase: true, trim: true},
    description: {type:String},
    isActive: {type:Boolean, default:false},
    createdAt: {type:Date,default:Date.now},
})

const category = mongoose.model('category', categorySchema)

count = async () => {
    if (await  category.countDocuments() > 0) return
        Promise.all([
            category.create({ 
                
             }),
          ]).then(() => console.log(' Category Created')).catch(() => console.log('Failed!'))  
};
  count()

module.exports = category