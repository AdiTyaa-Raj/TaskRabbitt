const express = require('express');
const router = express.Router();
const {getProfile,updateProfile} = require('../controllers/profileControler');

router.get('/:userId',getProfile);
router.put('/:userId',updateProfile);

module.exports = router;