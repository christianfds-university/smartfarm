var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstadoFenologicoSafraSchema = new Schema({
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
    }
});

module.exports = mongoose.model('EstadoFenologicoSafra', EstadoFenologicoSafraSchema);