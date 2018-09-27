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
  }
});

module.exports = mongoose.model('Propriedade', PropriedadeSchema);