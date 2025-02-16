import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Properties</h2>
      <div className="space-y-4">
        {properties.map(property => (
          <div key={property.id} className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p>Location: {property.location}</p>
            <p>Price: ₹{property.price} (AI Suggested: ₹{property.ai_suggestion})</p>
            <p>Landlord: {property.landlord_name}</p>
          </div>
        ))}
        <div className="mb-8 p-6 bg-blue-50 rounded-xl">
  <h2 className="text-2xl font-bold mb-3">AI-Powered Price Insights</h2>
  <p className="text-gray-600">
    Our smart algorithm analyzes market trends to help you find fair prices. 
    Look for the <span className="text-green-500 font-medium">"Good Deal!"</span> badge 
    indicating prices below market value.
  </p>
</div>
      </div>
    </div>
  );
}