const mongoose = require('mongoose')

const conplaintSchema = new mongoose.Schema({
    name: {type:String},
    contactNo: {type:String},
    detail: {type:String},
    image: {type:String},
    createdAt: {type:Date,default:Date.now},
})

const complaint = mongoose.model('complaint', conplaintSchema)

count = async () => {
    if (await  complaint.countDocuments() > 0) return
        Promise.all([
            complaint.create({ 
                
             }),
          ]).then(() => console.log(' complaint Created')).catch(() => console.log('Failed!'))  
};
  count()

module.exports = complaint