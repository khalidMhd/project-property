const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, trim: true },
    email: { type: String, unique: true,lowercase: true, trim: true },
    password: { type: String },
    userType: { type: String },
    deleted: { type: Boolean, default: true, },
    created_at: { type: Date, default: Date.now },
})

const user = mongoose.model('user', userSchema)

count = async () => {
    if (await user.countDocuments() > 0) return
    Promise.all([
        user.create({
            
        }),
    ]).then(() => console.log(' Users Created')).catch(() => console.log('Failed!'))
}

count()

module.exports = user