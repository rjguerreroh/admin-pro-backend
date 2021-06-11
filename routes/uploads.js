const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornImage } = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');

const router = Router();
router.use(expressFileUpload());
router.put('/:tipo/:id', [validarJWT], fileUpload);
router.get('/:type/:image', retornImage);

module.exports = router;