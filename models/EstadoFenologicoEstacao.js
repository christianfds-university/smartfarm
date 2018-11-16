var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstadoFenologicoEstacaoSchema = new Schema({
    data: {
        type: Date,
        default: Date.now,
        required: true
    },
    estado_fenologico_cultivar_id: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoFenologicoCultivar',
        required: true
    },
    safra_id: {
        type: Schema.Types.ObjectId,
        ref: 'Safra',
        required: true
    },
    estacao_id: {
        type: Schema.Types.ObjectId,
        ref: 'Estacao',
        required: true
    }
});

module.exports = mongoose.model('EstadoFenologicoEstacao', EstadoFenologicoEstacaoSchema);