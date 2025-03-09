import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Share = ({ recipeName, recipeUrl }) => {
  const encodedRecipeName = encodeURIComponent(recipeName);
  const encodedRecipeUrl = encodeURIComponent(recipeUrl);

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=Check%20out%20this%20recipe:%20${encodedRecipeName}%20${encodedRecipeUrl}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedRecipeUrl}`;

  console.log("whatsappShareUrl", whatsappShareUrl);
  console.log("facebookShareUrl", facebookShareUrl);
  return (
    <div className="w-1/3 h-1/2 bg-slate-50 mx-auto p-4 rounded-lg shadow-red-600 shadow-lg">
      <h1 className="text-2xl text-center">Share Recipe</h1>
      <h1 className="text-2xl text-center italic">via</h1>
      <div className="flex justify-center w-full items-center gap-4 mt-8">
        <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="text-green-600 px-2 text-6xl hover:scale-150 cursor-pointer" />
        </a>
        <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-sky-600 px-2 text-6xl hover:scale-150 cursor-pointer" />
        </a>
      </div>
    </div>
  );
};

export default Share;
