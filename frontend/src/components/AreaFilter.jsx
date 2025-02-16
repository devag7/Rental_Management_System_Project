import { BANGALORE_AREAS } from '../constants'; 

export default function AreaFilter({ selectedArea, setSelectedArea }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-3">Filter by Area:</h3>
      <select 
        value={selectedArea}
        onChange={(e) => setSelectedArea(e.target.value)}
        className="w-full p-2 border rounded-lg"
      >
        <option value="All">All Areas</option>
        {BANGALORE_AREAS.map(area => (
          <option key={area} value={area}>{area}</option>
        ))}
      </select>
    </div>
  );
}