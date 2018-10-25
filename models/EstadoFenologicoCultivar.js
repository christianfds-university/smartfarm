var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstadoFenologicoCultivarSchema = new Schema({
    ordem: {
        type: Number,
        required: true
    },
    sigla: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    img_path: {
        type: String
    },
    cultivar_id: {
        type: Schema.Types.ObjectId,
        ref: 'Cultivar',
        required: true
    }
});

module.exports = mongoose.model('EstadoFenologicoCultivar', EstadoFenologicoCultivarSchema);