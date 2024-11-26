const { Resource } = require('../models');

// Getting all resources
const getResources = async (req, res) => {
  try {
    const resources = await Resource.findAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
};

// Adding a new resource
const addResource = async (req, res) => {
  try {
    const { name, description } = req.body;
    const resource = await Resource.create({ name, description });
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add resource' });
  }
};

// Updating a resource
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const resource = await Resource.findByPk(id);
    if (resource) {
      resource.name = name;
      resource.description = description;
      await resource.save();
      res.json(resource);
    } else {
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update resource' });
  }
};

// Deleting a resource
const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findByPk(id);
    if (resource) {
      await resource.destroy();
      res.json({ message: 'Resource deleted' });
    } else {
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resource' });
  }
};

module.exports = { getResources, addResource, updateResource, deleteResource };

