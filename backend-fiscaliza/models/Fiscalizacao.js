const mongoose = require('mongoose');

const FiscalizacaoSchema = new mongoose.Schema({
  data: { type: Date, default: Date.now },
  status: { type: String, required: true, enum: ['Em dia', 'Atrasada', 'Parada'] },
  observacoes: { type: String, required: true },
  localizacao: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
  foto: { type: String, required: true },
  obra: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Obra',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Fiscalizacao', FiscalizacaoSchema);