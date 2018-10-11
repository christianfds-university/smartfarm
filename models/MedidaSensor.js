var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MedidaSensorSchema = new Schema({
    medida: {
        type: Number,
        required: true
    },
    dt: {
        type: Date,
        required: true
    },
    sensor_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('MedidaSensor', MedidaSensorSchema);