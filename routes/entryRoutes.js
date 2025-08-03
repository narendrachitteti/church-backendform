const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');

router.get('/', entryController.getEntries);
router.post('/', entryController.createEntry);
router.put('/:id', entryController.updateEntry);
router.delete('/:id', entryController.deleteEntry);
module.exports = router;
