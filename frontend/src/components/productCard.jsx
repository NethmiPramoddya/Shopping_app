export default function ProductCard(props) {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 m-4">
      <img 
        src={props.image} 
        alt={props.name} 
        className="w-full h-64 object-cover" 
      />
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">{props.name}</h1>
        <p className="text-lg text-green-600 font-bold mb-4">{props.price}</p>
        <button className="w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent transition duration-300">
          View More
        </button>
      </div>
    </div>
  );
}
