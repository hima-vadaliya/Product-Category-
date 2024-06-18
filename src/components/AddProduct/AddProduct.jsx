import React, { useState } from "react";
import CategoryIndex from "../indexes/CategoryIndex";
import ProductIndex from "../indexes/ProductIndex";
import axios from "axios";

function AddProduct() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        "https://testapi.demoserver.biz/api/products/add",
        newProduct,
        { headers: { authorization: token } }
      );
      if (response.status === 200) {
        setProducts((prevProducts) => [...prevProducts, response.data.data]);
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <div>
      <CategoryIndex addProduct={addProduct} />
      <ProductIndex products={products} />
    </div>
  );
}

export default AddProduct;
