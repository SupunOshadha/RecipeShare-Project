import React, { useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa"; //  Added for rating display
import { Link } from "react-router-dom";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const scrollElement = useRef();

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);

    console.log("horizontal data", categoryProduct.data);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  //  Function to render stars based on average rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <div className="flex items-center gap-1 text-yellow-400">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} />
        ))}
        {halfStar && <FaStarHalf />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} />
        ))}
        <span className="text-gray-500 text-sm">
          ({rating?.toFixed(1)})
        </span>
      </div>
    );
  };
  

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        {/* Left Scroll Button */}
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>

        {/* Right Scroll Button */}
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {/* Loading State */}
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                <div className="p-4 grid w-full gap-2">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                  <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                  <div className="flex gap-3 w-full">
                    <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                  </div>
                  <button className="text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                to={"product/" + product?._id}
                key={product?._id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
              >
                {/* Product Image */}
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] lg shadow-red-600 shadow-md">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.recipeName}
                    className="object-scale-down h-full hover:scale-110 transition-all"
                  />
                </div>

                {/* Product Details */}
                <div className="p-4 grid gap-1 w-full">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.recipeName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>

                  {/*  Display Average Rating as Stars */}
                  {renderStars(product?.averageRating || 0)}
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
