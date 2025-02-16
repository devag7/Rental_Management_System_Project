import { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import AreaFilter from '../components/AreaFilter';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await axios.get('/api/properties');
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load properties');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(property => 
    selectedArea === 'All' || property.area === selectedArea
  );

  if (loading) {
    return <div className="text-center py-8">Loading properties...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AreaFilter 
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
      />

      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No properties found in {selectedArea === 'All' ? 'Bangalore' : selectedArea}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}