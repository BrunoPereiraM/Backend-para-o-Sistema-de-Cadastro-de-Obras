const express = require('express');
const router = express.Router();
const obraController = require('../controllers/obraController');
const upload = require('../middleware/upload');

// O 'upload.single('foto')' processa um único arquivo do campo 'foto'
router.post('/', upload.single('foto'), obraController.createObra);
router.get('/', obraController.getAllObras);
router.get('/:id', obraController.getObraById);
router.put('/:id', upload.single('foto'), obraController.updateObra);
router.delete('/:id', obraController.deleteObra);

// Rotas especiais
router.get('/:id/fiscalizacoes', obraController.getFiscalizacoesByObra);
router.post('/:id/send-email', obraController.sendObraEmail);

module.exports = router;