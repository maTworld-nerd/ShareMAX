// importing modules
const express = require('express');
const router = express.Router();
const { getResources, addResource, updateResource, deleteResource } = require('../controllers/resourceController');

// Route to get all resources
router.get('/', getResources);

// Route to add a new resource
router.post('/', addResource);

// Route to update a resource
router.put('/:id', updateResource);

// Route to delete a resource
router.delete('/:id', deleteResource);

module.exports = router;
