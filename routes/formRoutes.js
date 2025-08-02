const express = require('express');
const router = express.Router();
const { getForms, createForm, updateForm, deleteForm } = require('../controllers/formController');

router.get('/', getForms);
router.post('/', createForm);
router.put('/:id', updateForm);
router.delete('/:id', deleteForm);

module.exports = router;
