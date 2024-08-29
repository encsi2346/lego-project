const mongoose = require('mongoose');

const creationSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    images: [String],
    description: String,
    rating: Number,
    legoFamily: String,
});

const CreationModel = mongoose.model('Creation', creationSchema);

module.exports = CreationModel;