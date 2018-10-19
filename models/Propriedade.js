var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropriedadeSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  dono: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
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

// TODO
// Método onde dado um user_id e propriedade_id verifica se este é dono da propriedade

module.exports = mongoose.model('Propriedade', PropriedadeSchema);