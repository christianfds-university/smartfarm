var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoCultivarSchema = new Schema({
    nome: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TipoCultivar', TipoCultivarSchema);