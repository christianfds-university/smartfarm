var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorSchema = new Schema({
    tipo_sensor_id: {
        type: String,
        required: true
    },
    talhao_id: {
        type: String,
        required: true
    },
    sensor_id_ext: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Sensor', SensorSchema);