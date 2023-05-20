const { Schema, model } = require('mongoose')


const userSchema = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        username: { type: String },
        email: { type: String },
        birthDate: { type: Date },
        password: { type: String },
        profilePicUrl: { type: String }

    },
    {
        timestamps: true
    })

module.exports = model('User', userSchema)