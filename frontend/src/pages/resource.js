import React, { useState, useEffect } from 'react';
import API from '../services/api';
import './resource.css'; 

function Resource() {
  const [resources, setResources] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await API.get('/routes/resource');
        setResources(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch resources');
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/routes/resource', { name, description });
      setResources([...resources, response.data]);
      setName('');
      setDescription('');
    } catch (error) {
      setError('Failed to add resource');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedResource = { name, description };
      const response = await API.put(`/routes/resource/${id}`, updatedResource);
      setResources(resources.map(resource => (resource.id === id ? response.data : resource)));
      setName('');
      setDescription('');
    } catch (error) {
      setError('Failed to update resource');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/routes/resource/${id}`);
      setResources(resources.filter(resource => resource.id !== id));
    } catch (error) {
      setError('Failed to delete resource');
    }
  };

  return (
    <div className="resource-container">
      <h1>Resources</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <ul>
            {resources.map(resource => (
              <li key={resource.id}>
                {resource.name}: {resource.description}
                <button onClick={() => handleUpdate(resource.id)}>Update</button>
                <button onClick={() => handleDelete(resource.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label>Description:</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <button type="submit">Add Resource</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Resource;
