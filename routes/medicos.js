/**
 * HMedicos
 * /api/Medicos
 */

const { Router } = require('express');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getMedicos);
router.post('/', [
    validarJWT, 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El el hospital id es obligatorio').isMongoId(),
    validarCampos
],crearMedico);
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('hospital', 'El hospital id es obligatorio').not().isEmpty(),
    validarCampos
], actualizarMedico);
router.delete('/:id', validarJWT, borrarMedico);

module.exports = router;