var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TalhaoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    propriedade_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Propriedade',
        required: true
    },
    kml_path: {
        type: String
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

module.exports = mongoose.model('Talhao', TalhaoSchema);