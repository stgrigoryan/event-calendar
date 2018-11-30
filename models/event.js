const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema( {
    id: String,
    created: String,
    title : String,
    text: String
});

module.exports = eventSchema;