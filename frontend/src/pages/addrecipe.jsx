import React, { useState } from "react";

const AddRecipe = () => {
  const [imagePreview, setImagePreview] = useState(null);

  // Handle image selection and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        marginTop: "0", 
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "800px", 
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "20px", 
            fontWeight: "600",
            marginBottom: "15px",
          }}
        >
          Add a New Recipe
        </h1>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <label
            style={{
              fontWeight: "600",
              fontSize: "16px",
              color: "#555",
              
            }}
          >
            Recipe Name:
            <input
              type="text"
              placeholder="Enter recipe name"
              style={{
                padding: "8px",
                paddingRight: "60%",
                fontSize: "14px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginTop: "8px",
                marginLeft: "20px",
              }}
            />
          </label>

          <label
            style={{
              fontWeight: "600",
              fontSize: "16px",
              color: "#555",
              
            }}
          >
            Ingredients:
            <textarea
              placeholder="List ingredients here..."
              style={{
                padding: "8px",
                paddingRight: "62%",
                fontSize: "14px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                resize: "vertical",
                minHeight: "80px",
                marginTop: "8px",
                marginLeft: "31px",
              }}
            />
          </label>

          <label
            style={{
              fontWeight: "600",
              fontSize: "16px",
              color: "#555",
            }}
          >
            Instructions:
            <textarea
              placeholder="Describe the steps..."
              style={{
                padding: "8px",
                paddingRight: "62%",
                fontSize: "14px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                resize: "vertical",
                minHeight: "80px",
                marginTop: "8px",
                marginLeft: "29px",
              }}
            />
          </label>

          <label
            style={{
              fontWeight: "600",
              fontSize: "16px",
              color: "#555",
            }}
          >
            Recipe Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                padding: "8px",
                paddingRight: "48%",
                fontSize: "14px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginTop: "8px",
                marginLeft: "18px",
              }}
            />
          </label>

          {imagePreview && (
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333",
                  marginBottom: "8px",
                }}
              >
                Image Preview:
              </p>
              <img
                src={imagePreview}
                alt="Recipe Preview"
                style={{
                  width: "100%",
                  maxWidth: "200px", 
                  borderRadius: "5px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "15px",
            }}
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
