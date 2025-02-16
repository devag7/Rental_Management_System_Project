export default function PropertyCard({ property }) {
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
        <img src={property.images[0]} alt={property.title} className="w-full h-56 object-cover rounded-t-xl" />
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{property.title}</h3>
            <span className={`${property.ai_color} text-white px-3 py-1 rounded-full text-sm`}>
              {property.ai_rating}
            </span>
          </div>
  
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-sm">
              {property.area}
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
              {property.square_ft} sq.ft
            </span>
          </div>
  
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold">For:</span> {property.tenant_preference}
            </p>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((a, i) => (
                <span key={i} className="bg-gray-100 px-2 py-1 rounded-md text-sm">
                  {a}
                </span>
              ))}
            </div>
          </div>
  
          <div className="mt-4 flex items-center justify-between">
            <p className="text-2xl font-bold text-indigo-600">
              ₹{property.price}
              <span className="text-gray-500 text-lg">/month</span>
            </p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Contact Owner
            </button>
          </div>
        </div>
      </div>
    );
  }