import React, { useState } from "react";
import AdminEditProduct from "./AdminEditProduct";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isApproved, setIsApproved] = useState(data.status === "Approved");

  const handleUpdateStatus = async (status) => {
    try {
      if (status === "Rejected") {
        // Call the delete endpoint
        const response = await fetch(
          `${SummaryApi.rejectProduct.url}/${data._id}`,
          {
            method: SummaryApi.rejectProduct.method,
            credentials: "include",
          }
        );

        const responseData = await response.json();

        if (responseData.success) {
          toast.success(responseData.message || "Recipe rejected!");
          setIsVisible(false); // Hide the card on success
          fetchdata(); // Refresh data
        } else {
          toast.error(responseData.message || "Failed to reject the recipe.");
        }
      } else {
        // Update the product status for "Approved"
        const updatedData = { ...data, status };

        const response = await fetch(SummaryApi.updateProduct.url, {
          method: SummaryApi.updateProduct.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        const responseData = await response.json();

        if (responseData.success) {
          toast.success(`Recipe ${status}!`);
          if (status === "Approved") setIsApproved(true); // Mark as approved
          fetchdata(); // Refresh data
        } else {
          toast.error(responseData.message || "Action failed.");
        }
      }
    } catch (error) {
      toast.error("An error occurred while performing the action.");
    }
  };

  return (
    <div className="bg-slate-300 p-4 rounded">
      <div className="w-40">
        <div className="w-36 h-36 flex justify-center items-center mx-auto">
          <img
            src={data?.productImage[0]}
            alt="Recipe"
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.recipeName}</h1>

        <div>
          <div>
            <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
              onClick={() => setEditProduct(true)}
            >
              Edit Recipe
            </button>
          </div>
          {!isApproved && (
            <div onClick={() => handleUpdateStatus("Approved")}>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Accept
              </button>
            </div>
          )}
          <div onClick={() => handleUpdateStatus("Rejected")}>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Reject
            </button>
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
