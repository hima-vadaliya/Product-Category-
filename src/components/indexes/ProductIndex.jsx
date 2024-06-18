import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThreeDots } from "react-loader-spinner";
import { Box } from "@mui/material";


function ProductIndex() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(8); 
  const token = localStorage.getItem("token");

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "https://testapi.demoserver.biz/api/products/list",
        { headers: { authorization: token } }
      );
      if (response.status === 200) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
  }, []);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  if (loading) {
    return (
      <div className="spinner-container d-flex justify-content-center align-items-center vh-100">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="red"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <Box>
      <div className="category-index">
        <h1 className="text-center mt-4">Products</h1>
        <div className="row justify-content-center ">
          {currentProducts.map((product) => (
            <div
              className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4"
              key={product._id}
            >
              <div className="card h-100 border">
                <div className="card-body boder-1">
                  <img alt="h" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBDeyxVMecN4RKtWAq7rCYFZ6p-I_VtjDINsXnZ3dv2qe7u9MHtHYeIHHFrMzdZjnAIq8&usqp=CAU"></img>
                  <h3 className="card-title">{product.name}</h3>
                  <h6>{product._id}</h6>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Price: {product.price}</li>
                  <li className="list-group-item">
                    Created: {product.created_on}
                  </li>
                  <li className="list-group-item">
                    Updated: {product.updated_on}
                  </li>
                  <li className="list-group-item">
                    {product.tags &&
                      Array.isArray(product.tags) &&
                      product.tags.length > 0 &&
                      product.tags.filter(
                        (tag) => typeof tag === "string" &&  { tag }
                      )}
                  </li>

                  <li className="list-group-item">
                    Colours Available:
                    {Array.isArray(product.colours) &&
                      product.colours.map(
                        (color) => color && <span  >&nbsp;{color}</span>
                      )}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            className="btn btn-primary mx-2"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={handleNextPage}
            disabled={indexOfLastProduct >= products.length}
          >
            Next
          </button>
        </div>
      </div>
    </Box>
  );
}

export default ProductIndex;
