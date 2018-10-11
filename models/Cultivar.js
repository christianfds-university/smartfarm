var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CultivarSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    tipo_cultivar_id: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Cultivar', CultivarSchema);