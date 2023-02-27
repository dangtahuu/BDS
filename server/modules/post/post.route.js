const express = require('express');
const router = express.Router();
const postController = require('./post.controller');
const { auth } = require('../../middleware');

router.get('/get-for-update/:id', auth, postController.getPostForUpdate);
router.patch('/interaction/:id', auth, postController.interaction);
router.patch('/contact/:id', auth, postController.contact);
router.patch('/check-outdated-vip', postController.checkOutDatedVip);
router.patch('/check-timeout', postController.checkTimeout);

router.get('/dashboard', postController.getDashboardData);
router.get('/:id', postController.getDetailPost);
router.patch('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.post('/', auth, postController.createNewPost);
router.get('/', postController.getAllPost);

module.exports = router;