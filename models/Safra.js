var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SafraSchema = new Schema({
    numero: {
        type: Number,
        default: 1,
        required: true
    },
    talhao_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Talhao', 
        required: true
    },
    cultivar_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Cultivar',
        required: true
    },
    data_ini: {
        type: Date,
        default: Date.now,
        required: true
    },
    data_fim: {
        type: Date,
        required: false
    },
    produtividade: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Safra', SafraSchema);