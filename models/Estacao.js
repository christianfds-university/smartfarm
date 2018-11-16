var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstacaoSchema = new Schema({
    _id_ext:{
        type: Number,
        required: true
    },
    talhao_id: {
        type: Schema.Types.ObjectId,
        ref: 'Talhao',
        required: true
    }
});

module.exports = mongoose.model('Estacao', EstacaoSchema);