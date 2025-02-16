import React, { useState } from 'react';
import axios from 'axios';

export default function AddProperty({ landlordId }) {
  const [form, setForm] = useState({ 
    title: '', 
    location: 'city', 
    size: 0, 
    rooms: 1, 
    price: 0, 
    location_link: '' 
  });
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach(image => formData.append('images', image));
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('landlord_id', landlordId);

    try {
      await axios.post('http://localhost:5001/api/properties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Property listed successfully!');
    } catch (err) {
      alert('Error listing property');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">List New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Property Title"
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 border rounded-lg"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <select
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="p-3 border rounded-lg"
          >
            <option value="city">City</option>
            <option value="suburb">Suburb</option>
          </select>
          
          <input
            type="number"
            placeholder="Size (sqft)"
            min="0"
            required
            onChange={(e) => setForm({ ...form, size: e.target.value })}
            className="p-3 border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Number of Rooms"
            min="1"
            required
            onChange={(e) => setForm({ ...form, rooms: e.target.value })}
            className="p-3 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Monthly Rent"
            min="0"
            required
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-3 border rounded-lg"
          />
        </div>

        <input
          type="url"
          placeholder="Google Maps Link"
          required
          onChange={(e) => setForm({ ...form, location_link: e.target.value })}
          className="w-full p-3 border rounded-lg"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium">Upload Images (max 5)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          List Property
        </button>
      </form>
    </div>
  );
}