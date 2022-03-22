const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    showTitle: { type: String, required: true},
    epNumber: { type: Number, required: true },
    streamPlat: { type: String, required: true },
    newDate: { type: Number, min: 0, max: 6}
});

module.exports = new mongoose.model('show', showSchema);