import React from 'react';
import ContactForm from './ContactForm';

export default function PropertyCard({ property, user }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-64 bg-gray-200 relative">
        {property.images?.map((img, index) => (
          <img 
            key={index}
            src={`http://localhost:5001/uploads/${img}`}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ))}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{property.title}</h3>
        
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {property.location}
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            {property.rooms} rooms
          </span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
            {property.size} sqft
          </span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              ₹{property.price}
            </p>
            <p className="text-sm text-gray-500">
              AI Suggested: ₹{property.ai_suggestion}
            </p>
          </div>
          {property.price < property.ai_suggestion && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              Good Deal!
            </span>
          )}
        </div>

        <div className="space-y-3">
          <a
            href={property.location_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            View on Map
          </a>
          
          {user?.role === 'tenant' && (
            <ContactForm 
              propertyId={property.id}
              landlordId={property.landlord_id}
              tenantId={user.id}
            />
          )}
        </div>
      </div>
    </div>
  );
}