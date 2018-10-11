var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoSensorSchema = new Schema({
    nome: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TipoSensor', TipoSensorSchema);