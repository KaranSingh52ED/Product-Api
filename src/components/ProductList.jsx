import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./../App.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col bg-emerald-50 items-center font-serif  ring-1 ring-violet-500 m-5 shadow-inner hover:text-green-600 shadow-black rounded-2xl p-2 justify-center">
            <h1 className="text-4xl m-5 p-2 font-bold border-2 rounded-lg shadow-lg shadow-black hover:translate-x-2 hover:rotate-3 hover:shadow-blue-500 text-center mb-10"> Latest Products</h1>
            <ul className="flex flex-wrap justify-center">
                {products.map((product) => (
                    <li key={product.id} className=" max-w-sm mx-4 mb-8 overflow-hidden  shadow-lg bg-fuchsia-100 rounded-lg hover:shadow-xl transform transition-shadow  hover:shadow-black duration-500 ease-in-out">
                        <Link to={{ pathname: `/product/${product.id}`, state: { product } }}>
                            <img src={product.thumbnail} alt={product.title} className="w-full h-64 min-w-96   object-cover object-center border-x-emerald-200 p-1 rounded-none   shadow-black shadow   " />
                        </Link>
                        <div className="px-6 flex flex-row  py-4">
                            <div className='mx-4'>
                                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                                <p className="text-gray-700 text-base mb-2">Stock: {product.stock}</p>
                                <p className="text-gray-700 text-base mb-4">Price: <b className='text-red-500'> ${product.price}</b></p>
                            </div>

                            <div className='mx-4'>
                                <p className="text-gray-700 text-base mb-4">Brand:<b> {product.brand}</b></p>
                                <p className="text-gray-700 text-base mb-4">Stock: {product.stock}</p>
                                <p className="text-gray-700 text-base mb-4">Discount: <span className='text-green-600 font-bold'>{product.discountPercentage}%</span></p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;