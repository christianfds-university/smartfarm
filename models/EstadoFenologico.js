var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstadoFenologicoSchema = new Schema({
    sigla: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    tipo_cultivar_id: {
        type: Schema.Types.ObjectId,
        ref: 'TipoCultivar',
        required: true
    }
});

module.exports = mongoose.model('EstadoFenologico', EstadoFenologicoSchema);