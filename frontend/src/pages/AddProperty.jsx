import { useState } from 'react';
import axios from 'axios';
import { BANGALORE_AREAS, PROPERTY_TYPES, TENANT_TYPES, AMENITIES } from '../constants';

export default function AddProperty() {
  const [form, setForm] = useState({
    title: '',
    price: '',
    area: 'Koramangala',
    property_type: '1BHK',
    square_ft: '',
    amenities: [],
    tenant_preference: 'Bachelors'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/properties', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Property listed successfully!');
    } catch (error) {
      alert('Error listing property');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">List New Property</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Property Title</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded-lg"
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
          />
        </div>

        {/* Other form fields similar to above */}

        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary">
          List Property
        </button>
      </form>
    </div>
  );
}