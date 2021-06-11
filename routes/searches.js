const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getSearch, getDocumentsCollection } = require('../controllers/searches');

router.get('/:search', [validarJWT], getSearch);
router.get('/collection/:table/:search', [validarJWT], getDocumentsCollection);

module.exports = router;