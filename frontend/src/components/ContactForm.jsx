// frontend/src/components/ContactForm.js
import React, { useState } from 'react';
import axios from 'axios';

export default function ContactForm({ propertyId, landlordId }) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/messages', {
        property_id: propertyId,
        landlord_id: landlordId,
        content: message
      });
      alert('Message sent successfully!');
      setMessage('');
    } catch (err) {
      alert('Failed to send message');
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Contact Landlord</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="Write your message..."
          rows="4"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}