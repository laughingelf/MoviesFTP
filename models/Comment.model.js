const { Schema, model } = require('mongoose')


const commentSchema = new Schema(
    {
        username: { type: Schema.Types.ObjectId, ref: "User" },
        userComments: { type: String },
        overallRating: { type: Number },
        watchAgainRating: { type: Number },
        trashCanRating: { type: Number },
        movieId: { type: Schema.Types.ObjectId, ref: "Movie" }

    },
    {
        timestamps: true
    })

module.exports = model('Comment', commentSchema)