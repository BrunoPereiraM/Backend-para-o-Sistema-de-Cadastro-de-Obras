const Obra = require('../models/Obra');
const Fiscalizacao = require('../models/Fiscalizacao');
const { sendEmail } = require('../services/emailService');

// CREATE
exports.createObra = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhuma foto enviada!' });
    }
    const fotoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const novaObra = new Obra({ ...req.body, foto: fotoUrl });
    await novaObra.save();
    res.status(201).json(novaObra);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ ALL
exports.getAllObras = async (req, res) => {
  try {
    const obras = await Obra.find();
    res.status(200).json(obras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE
exports.getObraById = async (req, res) => {
  try {
    const obra = await Obra.findById(req.params.id);
    if (!obra) return res.status(404).json({ message: 'Obra não encontrada' });
    res.status(200).json(obra);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateObra = async (req, res) => {
  try {
    let dadosAtualizacao = { ...req.body };
    if (req.file) {
      dadosAtualizacao.foto = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const obra = await Obra.findByIdAndUpdate(req.params.id, dadosAtualizacao, { new: true });
    if (!obra) return res.status(404).json({ message: 'Obra não encontrada' });
    res.status(200).json(obra);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteObra = async (req, res) => {
  try {
    const obra = await Obra.findByIdAndDelete(req.params.id);
    if (!obra) return res.status(404).json({ message: 'Obra não encontrada' });

    // Deleta fiscalizações associadas
    await Fiscalizacao.deleteMany({ obra: req.params.id });

    res.status(200).json({ message: 'Obra e fiscalizações associadas deletadas com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET FISCALIZACOES BY OBRA
exports.getFiscalizacoesByObra = async (req, res) => {
    try {
        const fiscalizacoes = await Fiscalizacao.find({ obra: req.params.id });
        res.status(200).json(fiscalizacoes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// SEND EMAIL
exports.sendObraEmail = async (req, res) => {
  try {
    const { to } = req.body;
    if(!to) return res.status(400).json({ message: "Destinatário do e-mail não informado." });

    const obra = await Obra.findById(req.params.id);
    if (!obra) return res.status(404).json({ message: 'Obra não encontrada' });
    
    const fiscalizacoes = await Fiscalizacao.find({ obra: obra._id });

    let fiscalizacoesHtml = fiscalizacoes.map(f => `
      <li>
        <strong>Status:</strong> ${f.status}<br/>
        <strong>Data:</strong> ${new Date(f.data).toLocaleDateString()}<br/>
        <strong>Observações:</strong> ${f.observacoes}
      </li>
    `).join('');

    const subject = `Relatório da Obra: ${obra.nome}`;
    const html = `
      <h1>${obra.nome}</h1>
      <p><strong>Responsável:</strong> ${obra.responsavel}</p>
      <p><strong>Descrição:</strong> ${obra.descricao}</p>
      <img src="${obra.foto}" alt="Foto da Obra" width="300"/>
      <hr/>
      <h2>Fiscalizações</h2>
      <ul>${fiscalizacoesHtml || '<li>Nenhuma fiscalização registrada.</li>'}</ul>
    `;
    
    await sendEmail({ to, subject, html });

    res.status(200).json({ message: `E-mail enviado com sucesso para ${to}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao enviar e-mail", error: error.message });
  }
};