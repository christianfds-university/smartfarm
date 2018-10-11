var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorResumoDiaSchema = new Schema({
    dia: {
        type: Date,
        required: true
    },
    minima: {
        type: Number,
        required: true
    },
    maxima: {
        type: Number,
        required: true
    },
    media: {
        type: Number,
        required: true
    },
    sensor_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('SensorResumoDia', SensorResumoDiaSchema);