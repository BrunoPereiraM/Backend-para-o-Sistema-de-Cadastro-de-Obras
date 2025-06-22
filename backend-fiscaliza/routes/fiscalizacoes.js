const express = require('express');
const router = express.Router();
const fiscalizacaoController = require('../controllers/fiscalizacaoController');
const upload = require('../middleware/upload');

router.post('/', upload.single('foto'), fiscalizacaoController.createFiscalizacao);
router.get('/', fiscalizacaoController.getAllFiscalizacoes);

module.exports = router;