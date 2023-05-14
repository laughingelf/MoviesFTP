const { Schema, model } = require('mongoose')


const movieSchema = new Schema(
    {
        Title: { type: String },
        Year: { type: String },
        Rated: { type: String },
        Runtime: { type: String },
        Genre: { type: String },
        Director: { type: String },
        Actors: { type: String },
        Plot: { type: String },
        Awards: { type: String },
        Poster: { type: String },
        // Ratings: [String],
        imdbRating: { type: String },
        imdbVotes: { type: String },
        BoxOffice: { type: String },
        addedBy: { type: Schema.Types.ObjectId, ref: "User" },
        userRatings: [{ type: Schema.Types.ObjectId, ref: "Comment" }]

    },
    {
        timestamps: true
    })

module.exports = model('Movie', movieSchema)