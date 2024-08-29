const mongoose = require('mongoose');
const {Schema} = mongoose;

const PhotoSchema = new Schema({
    url: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;