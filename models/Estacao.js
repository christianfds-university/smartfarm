var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstacaoSchema = new Schema({
    numero: {
        type: Number,
        default: 1,
        required: true
    },
    talhao_id: {
        type: String,
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