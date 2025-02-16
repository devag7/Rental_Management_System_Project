export default function PriceIndicator({ rating, color }) {
    return (
      <div className={`${color} p-2 rounded-lg text-center`}>
        <p className="font-bold text-white text-sm">
          {rating}
        </p>
      </div>
    );
  }