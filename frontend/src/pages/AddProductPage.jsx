import React from "react";
import AddProduct from "./../components/Product/AddProduct"; // Import the AddProduct component

const AddProductPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white mt-24">
      <AddProduct /> {/* Just render AddProduct here */}
    </div>
  );
};

export default AddProductPage;
