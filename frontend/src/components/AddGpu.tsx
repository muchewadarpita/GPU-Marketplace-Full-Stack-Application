import React, { useState } from 'react';
import axios from 'axios';

function AddGpu({ onAddGpu }: { onAddGpu: () => void }) {
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5004/api/gpus',
        {
          model,
          description,
          startingPrice: Number(startingPrice),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('GPU listing added successfully!');
      setModel('');
      setDescription('');
      setStartingPrice('');
      setTimeout(() => setSuccess(''), 3000);
      onAddGpu();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add GPU listing');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New GPU Listing</h2>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Model</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Starting Price ($)</label>
          <input
            type="number"
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
            className="w-full p-2 border rounded"
            min="0"
            step="0.01"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Add Listing
        </button>
      </form>
    </div>
  );
}

export default AddGpu;