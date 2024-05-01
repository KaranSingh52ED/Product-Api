import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductInfo = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [activeImg, setActiveImage] = useState('');
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
                setActiveImage(data.thumbnail);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className='flex flex-col  font-serif justify-between p-5 bg-green-50 ring-1 ring-blue-500 m-5 shadow-inner shadow-black rounded-3xl lg:flex-row gap-16 lg:items-center'>

            <div className='flex flex-col gap-6 lg:w-2/5'>
                <img src={activeImg} alt={product.title} className='w-full h-full  object-cover rounded-xl' />
                <div className='flex flex-row justify-between overflow-x-auto overflow-y-hidden mb-5 min-36'>
                    {product.images.map((image, index) => (
                        <img key={index} src={image} alt={`Product ${index + 1}`} className='w-24 h-24 rounded-md  ring-1 ring-slate-700 hover:shadow-md m-4 transform transition-shadow  hover:shadow-black duration-500 ease-in-out shadow-xl  cursor-pointer ' onClick={() => setActiveImage(image)} />
                    ))}
                </div>
            </div>
            {/* ABOUT */}
            <div className='flex flex-col  gap-4 lg:w-2/4'>
                <div className=' items-center justify-center '>
                    <h1 className="text-4xl flex m-5 p-2 font-bold border-2 rounded-lg w-72 mt-10 justify-center items-center shadow-lg shadow-black hover:translate-x-2  font-serif hover:rotate-3 hover:shadow-blue-500 text-center mb-10"> Product Info</h1>
                </div>
                <div className=' space-x-5'>
                    <span >Brand:-   <b className=' text-violet-600 font-semibold'>{product.brand}</b></span>
                    <span >Category:-   <b className=' text-slate-600 font-semibold'>{product.category}</b></span>
                    <span >Rating:-   <b className=' text-green-600 font-semibold'>{product.rating}</b></span>
                </div>
                <div className='flex flex-row space-x-10'>

                    <h1 className='text-3xl font-bold'>{product.title}</h1>
                    <h6 className='text-2xl font-semibold'> Stock : <b className='text-green-600'>{product.stock} </b></h6>
                </div>
                <h6 className='text-2xl font-semibold'>Price: <b className='text-red-600'> ${product.price}  </b></h6>
                <h6 className='text-2xl font-semibold'> Discount : <b className='text-green-600'>{product.discountPercentage}% </b></h6>
                <p className='text-gray-700'>
                    {product.description}
                </p>


                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center'>
                        <button className='bg-green-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                        <span className='py-4 px-6 font-bold rounded-lg'>{amount}</span>
                        <button className='bg-green-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                    </div>
                    <button className='bg-violet-700 text-white  hover:bg-orange-400  font-semibold ring-1 ring-slate-700 hover:shadow-md transform transition-shadow  hover:shadow-black duration-500 ease-in-out shadow-xl  cursor-pointer py-3 px-8 rounded-xl h-full'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;