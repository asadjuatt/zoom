const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    full_Name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    otp: {
        type: String,
        minLength: 4
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    disabled: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User