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

module.exports = mongoose.model('Propriedade', PropriedadeSchema);