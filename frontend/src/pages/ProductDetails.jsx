import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import CategroyWiseProductDisplay from "../components/CategroyWiseProductDisplay";
import { FaShareAlt } from "react-icons/fa";
import Share from "../components/Share";

const ProductDetails = () => {
  const [data, setData] = useState({
    recipeName: "",
    category: "",
    productImage: [],
    instructions: "",
    ingredients: "",
    averageRating: 0, //  Added for displaying average rating
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);

  //  State for rating submission
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

   const [comments, setComments] = useState([]);    ///
   const [newComment, setNewComment] = useState("");

   useEffect(() => {
    fetchComments();
  }, [params]); // Fetch comments when page loads  ///   

  // fetching comments
  const fetchComments = async () => {
    try {
      const response = await fetch(`${SummaryApi.getComments.url}/${params.id}/comments`, {
        method: SummaryApi.getComments.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        console.error("Failed to fetch comments");
        setComments([]); // Prevent undefined errors
        return;
      }
  
      const dataResponse = await response.json();
      console.log("Fetched Comments Data:", dataResponse); // Debugging
  
      setComments(Array.isArray(dataResponse.comments) ? dataResponse.comments : []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  };

  //  Fetch product details
  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ productId: params?.id }),
    });
    setLoading(false);

    const dataReponse = await response.json();
    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  //  Submit Rating
  const handleRatingSubmit = async () => {
    try {
      const response = await fetch(
        `${SummaryApi.addRating.url}/${params?.id}/rate`, //  Correct URL
        {
          method: SummaryApi.addRating.method,
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            rating,
          }),
        }
      );
  
      const data = await response.json();
      if (response.ok) {
        fetchProductDetails(); //  Refresh product data
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };
  

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleShare = () => {
    navigate(
      `/share-recipe?recipeName=${encodeURIComponent(data?.recipeName)}&recipeUrl=${encodeURIComponent(window.location.href)}`
    );
  };

  ///add comments///
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
  
    const response = await fetch(`${SummaryApi.addComments.url}/${params.id}/comments`, {
      method: SummaryApi.addComments.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ text: newComment }),
    });
  
    if (response.ok) {
      setNewComment("");
      fetchComments(); // Refresh comments after posting
    } else {
      console.error("Failed to add comment");
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/*** Product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/** Zoomed Image */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }% `,
                  }}
                ></div>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((_, index) => (
                  <div className="h-20 w-20 bg-slate-200 rounded animate-pulse" key={index}></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => (
                  <div className="h-20 w-20 bg-slate-200 rounded p-1" key={imgURL}>
                    <img
                      src={imgURL}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      onClick={() => handleMouseEnterProduct(imgURL)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/*** Product Details */}
        <div className="flex flex-col gap-1">
          <div className="flex-row">
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.recipeName}
              <button className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit" onClick={handleShare}>
                <FaShareAlt />
              </button>
            </h2>
          </div>

          <p className="capitalize text-slate-400">{data?.category}</p>

          {/*  Display Average Rating */}
          <div className="flex items-center gap-1">
          {[...Array(Math.floor(data?.averageRating || 0))].map((_, index) => (
          <FaStar key={index} className="text-yellow-400" />
          ))}
          {data?.averageRating % 1 !== 0 && <FaStarHalf className="text-yellow-400" />}
          <span>({data?.averageRating?.toFixed(1)})</span>
          </div>


          {/*  Rating Submission */}
          <div className="flex gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
            <button className="bg-blue-500 text-white px-4 py-1 rounded ml-2" onClick={handleRatingSubmit}>
              Submit
            </button>
          </div>

          <p className="text-slate-600 font-medium my-1">Ingredients:</p>
          <p>{data?.ingredients}</p>

          <p className="text-slate-600 font-medium my-1">Instructions:</p>
          <p>{data?.instructions}</p>
        </div>
      </div>
      <div>
      <div className="mt-4">
  <h3 className="text-lg font-bold">Comments:</h3>
  {comments.length === 0 ? (
    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
  ) : (
    comments.map((comment, index) => (
      <div key={index} className="bg-gray-100 p-2 rounded-md mb-2">
        <p className="font-semibold">{comment?.user?.name || "Anonymous"}:</p>
        <p>{comment.text}</p>
        <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
      </div>
    ))
  )}
  {/* {(comments && comments.length > 0) ? (
  comments.map((comment, index) => (
    <div key={index} className="bg-gray-100 p-2 rounded-md mb-2">
      <p className="font-semibold">{comment?.user?.name || "Anonymous"}:</p>
      <p>{comment?.text || "No text available"}</p>
      <p className="text-xs text-gray-500">{comment?.createdAt ? new Date(comment.createdAt).toLocaleString() : "Unknown date"}</p>
    </div>
  ))
) : (
  <p className="text-gray-500">No comments yet. Be the first to comment!</p>
)} */}

</div>

{/* Comment input field */}
<div className="mt-2">
  <input
    className="rounded-full p-2 w-full shadow border outline-none"
    type="text"
    placeholder="Enter your comment..."
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
  />
  <button
    className="bg-red-500 text-white px-4 py-1 rounded mt-2"
    onClick={handleAddComment}
  >
    Add Comment
  </button>
</div>

      </div>

      {data.category && <CategroyWiseProductDisplay category={data?.category} heading="Recommended Recipes" />}
      {data.recipeName && <Share recipeName={data.recipeName} recipeUrl={window.location.href} />}
    </div>
  );
};

export default ProductDetails;
