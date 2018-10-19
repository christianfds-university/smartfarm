var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProdutividadeCultivarSchema = new Schema({
    produtividade: {
        type: Number,
        required: true
    },
    cultivar_id: {
        type: Schema.Types.ObjectId,
        ref: 'Cultivar',
        required: true
    }
});

module.exports = mongoose.model('ProdutividadeCultivar', ProdutividadeCultivarSchema);