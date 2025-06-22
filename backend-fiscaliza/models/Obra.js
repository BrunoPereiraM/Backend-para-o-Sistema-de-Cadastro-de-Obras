const mongoose = require('mongoose');

const ObraSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  responsavel: { type: String, required: true },
  dataInicio: { type: Date, required: true },
  dataFim: { type: Date },
  localizacao: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  descricao: { type: String },
  foto: { type: String, required: true }, // URL da imagem
}, { timestamps: true });

module.exports = mongoose.model('Obra', ObraSchema);