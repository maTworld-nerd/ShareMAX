const express = require('express');
const { getAllResources, createResource } = require('../controllers/resourceController');

const router = express.Router();

router.get('/', getAllResources);
router.post('/', createResource);

module.exports = router;
