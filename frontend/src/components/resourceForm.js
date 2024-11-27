import React, { useState } from 'react';
import API from '../services/api';

function ResourceForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/resources', { name, description });
      console.log(response.data);
      // Handling successful resource submission 
    } catch (error) {
      console.error('Resource submission failed:', error.response.data);  
    }
  };

  return (
    <div>
      <h1>Submit Resource</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Resource Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <button type="submit">Submit Resource</button>
      </form>
    </div>
  );
}

export default ResourceForm;
