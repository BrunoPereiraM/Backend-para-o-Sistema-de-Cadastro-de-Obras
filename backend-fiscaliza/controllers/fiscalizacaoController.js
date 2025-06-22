const Fiscalizacao = require('../models/Fiscalizacao');

// CREATE
exports.createFiscalizacao = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Nenhuma foto enviada!' });
        }
        const fotoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        const novaFiscalizacao = new Fiscalizacao({ ...req.body, foto: fotoUrl });
        await novaFiscalizacao.save();
        res.status(201).json(novaFiscalizacao);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ ALL
exports.getAllFiscalizacoes = async (req, res) => {
    try {
        const fiscalizacoes = await Fiscalizacao.find().populate('obra', 'nome');
        res.status(200).json(fiscalizacoes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Demais métodos CRUD (GET by ID, UPDATE, DELETE) podem ser implementados de forma similar se necessário.