import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImage] = useState("");
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setActiveImage(data.thumbnail);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!product)
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-lg text-gray-400 animate-pulse">
        Loading product info...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-violet-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg ring-1 ring-violet-200 p-8 flex flex-col lg:flex-row gap-12">
        {/* Image Section */}
        <div className="flex flex-col gap-6 lg:w-2/5">
          <img
            src={activeImg}
            alt={product.title}
            className="w-full h-80 object-cover rounded-2xl shadow-md border border-violet-100"
          />
          <div className="flex flex-row gap-4 overflow-x-auto pb-2">
            {product.images.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`${product.title} ${idx + 1}`}
                className={`w-20 h-20 object-cover rounded-lg border-2 ${
                  activeImg === image
                    ? "border-violet-600 ring-2 ring-violet-300"
                    : "border-transparent"
                } cursor-pointer shadow hover:shadow-lg transition-shadow`}
                onClick={() => setActiveImage(image)}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setActiveImage(image)}
              />
            ))}
          </div>
        </div>
        {/* Info Section */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-violet-800 mb-2 tracking-tight drop-shadow-lg">
            Product Info
          </h1>
          <div className="flex flex-wrap gap-6 text-base text-gray-600 font-medium">
            <span>
              Brand:{" "}
              <span className="text-violet-600 font-semibold">
                {product.brand}
              </span>
            </span>
            <span>
              Category:{" "}
              <span className="text-slate-700 font-semibold">
                {product.category}
              </span>
            </span>
            <span>
              Rating:{" "}
              <span className="text-green-600 font-semibold">
                {product.rating}
              </span>
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {product.title}
          </h2>
          <div className="flex flex-wrap gap-8 items-center text-lg font-semibold">
            <span>
              Stock: <span className="text-green-600">{product.stock}</span>
            </span>
            <span>
              Price: <span className="text-red-600">${product.price}</span>
            </span>
            <span>
              Discount:{" "}
              <span className="text-emerald-600">
                {product.discountPercentage}%
              </span>
            </span>
          </div>
          <p className="text-gray-700 text-base mt-2">{product.description}</p>
          {/* Quantity & Add to Cart */}
          <div className="flex flex-wrap gap-8 items-center mt-6">
            <div className="flex items-center border border-violet-200 rounded-lg bg-emerald-50">
              <button
                className="px-4 py-2 text-2xl text-violet-700 hover:bg-emerald-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-violet-300 disabled:opacity-30"
                onClick={() => setAmount((prev) => Math.max(1, prev - 1))}
                disabled={amount <= 1}
                aria-label="Decrease quantity"
              >
                –
              </button>
              <span className="px-6 py-2 font-bold text-lg">{amount}</span>
              <button
                className="px-4 py-2 text-2xl text-violet-700 hover:bg-emerald-100 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
                onClick={() => setAmount((prev) => prev + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button className="bg-violet-700 hover:bg-violet-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-colors focus:outline-none focus:ring-4 focus:ring-violet-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
