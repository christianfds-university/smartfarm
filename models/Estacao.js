var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstacaoSchema = new Schema({
    _id_ext:{
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    talhao_id: {
        type: Schema.Types.ObjectId,
        ref: 'Talhao',
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

module.exports = mongoose.model('Estacao', EstacaoSchema);