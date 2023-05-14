const { Schema, model } = require('mongoose')


const commentSchema = new Schema(
    {
        username: { type: Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
        rating: { type: Number }

    },
    {
        timestamps: true
    })

module.exports = model('Comment', commentSchema)