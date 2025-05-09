import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-violet-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-violet-800 mb-12 tracking-tight drop-shadow-lg">
          Latest Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 border border-violet-200 flex flex-col"
            >
              <Link
                to={`/product/${product.id}`}
                className="focus:outline-none focus:ring-4 focus:ring-violet-300 rounded-t-2xl"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-60 object-cover rounded-t-2xl"
                />
              </Link>
              <div className="flex-1 flex flex-col justify-between p-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 truncate">
                    {product.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-1">
                    Brand: <span className="font-medium">{product.brand}</span>
                  </p>
                  <p className="text-gray-500 text-sm mb-1">
                    Stock: <span className="font-medium">{product.stock}</span>
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-emerald-600">
                    ${product.price}
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                    -{product.discountPercentage}% OFF
                  </span>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="mt-6 inline-block text-center bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-violet-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        {products.length === 0 && (
          <div className="text-center text-gray-400 mt-20 text-lg animate-pulse">
            Loading products...
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
