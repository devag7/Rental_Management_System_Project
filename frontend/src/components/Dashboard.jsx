import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddProperty from './AddProperty';
import PropertyList from './PropertyList';

export default function Dashboard() {
  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (user?.role === 'landlord') {
      axios.get(`http://localhost:5001/api/properties/${user.id}`)
        .then(res => setProperties(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {user?.role === 'landlord' ? (
        <>
          <AddProperty landlordId={user.id} />
          <h2 className="text-2xl mt-8 mb-4">Your Properties</h2>
          <PropertyList properties={properties} />
        </>
      ) : (
        <PropertyList />
      )}
    </div>
  );
}