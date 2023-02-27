const express = require('express');
const router = express.Router();
const categoryController = require('./category.controller');
const { auth } = require('../../middleware');

router.get('/:id', auth, categoryController.getDetailCategory);
router.patch('/:id', auth, categoryController.updateCategory);
router.delete('/:id', auth, categoryController.deleteCategory);
router.post('/', auth, categoryController.createCategory);
router.get('/', categoryController.getAllCategories);

module.exports = router;