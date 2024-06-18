import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./categoryindex.css";
import { Box } from "@mui/material";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";
import ModalValidation from "../validation/AddProductValidation";

function CategoryIndex() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const token = localStorage.getItem("token");

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://testapi.demoserver.biz/api/categories/list",
        { headers: { authorization: token } }
      );
      console.log(response.data.data, "response");
      if (response.status === 200) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, []);

  const handleShowModal = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategoryId(null);
    setSelectedCategoryName(null);
  };

  const validationSchema = ModalValidation;

  const handleAddProduct = async (values, { setSubmitting, resetForm }) => {
    const newProduct = {
      name: values.productName,
      price: values.productPrice,
      category_id: selectedCategoryId,
      category_name: selectedCategoryName,
      colours: values.colors,
      tags:values.tags
    };

    try {
      const response = await axios.post(
        "https://testapi.demoserver.biz/api/products/add",
        newProduct,
        { headers: { authorization: token } }
      );

      if (response.status === 200) {
        console.log("Product added successfully", response.data);
        toast.success("Product added successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setCategories(
          categories.map((category) =>
            category._id === selectedCategoryId
              ? {
                  ...category,
                  productCount:
                    (category.productCount || category.products) + 1,
                }
              : category
          )
        );
      }
    } catch (error) {
      console.error("Error ", error);
    } finally {
      setSubmitting(false);
      resetForm();
      handleCloseModal();
    }
  };
 
  return (
    <Box>
      <div className="container-fluid category-index">
        <h1 class="text-center mt-4 ">Categories</h1>

        <div className="text-center mb-4">
          <div
            className="row text-center d-flex justify-content-center"
            style={{ marginLeft: "0" }}
          >
            {loading ? (
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
            ) : (
              categories.map((category) => (
                <div
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4"
                  key={category._id}
                >
                  <div className="card h-100">
                    <img
                      src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-hands-choosing-products-category-while-doing-online-shopping-png-image_6319148.png"
                      className="card-img-top"
                      alt={category.name}
                    />
                    <div className="card-body">
                      <h3>{category.name}</h3>
                      <h6 className="card-title text-dark">{category._id}</h6>
                      <Box sx={{ boxShadow: 3 }}>
                        {" "}
                        Product Count:{category.productCount || category.products}
                      </Box>
                    </div>
                    <ul className="list-group list-group-flush">
                   
                      <li className="list-group-item">{category.created_on}</li>
                      <li className="list-group-item">{category.updated_on}</li>
                    </ul>
                    <Button
                      className="btn btn-primary"
                      onClick={() =>
                        handleShowModal(category._id, category.name)
                      }
                    >
                      Add Product
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <Modal className="mt-5" show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product to: </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{selectedCategoryName}</h4>
            {/* ID:<h4>{selectedCategoryId}</h4> */}
            <Formik
              initialValues={{
                productName: "",
                productPrice: "",
                colors: [],
                tags:[]
              }}
              validationSchema={validationSchema}
              onSubmit={handleAddProduct}
            >
              {({ isSubmitting }) => (
                <FormikForm>
                  <Form.Group controlId="formProductName" className="mt-3">
                    <Form.Label>Product Name</Form.Label>
                    <Field
                      type="text"
                      name="productName"
                      placeholder="Enter product name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="productName"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                  <Form.Group controlId="formProductPrice" className="mt-3">
                    <Form.Label>Product Price</Form.Label>
                    <Field
                      type="number"
                      name="productPrice"
                      placeholder="Enter product price"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="productPrice"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>
                  <Form.Group controlId="formColors" className="mt-3">
                    <Form.Label>Colors</Form.Label>
                    <div role="group" aria-labelledby="checkbox-group">
                      <Field
                        type="checkbox"
                        name="colors"
                        value="Green"
                        className="form-check-input"
                      />
                      <label className="form-check-label text-success">
                        Green
                      </label>
                      <Field
                        type="checkbox"
                        name="colors"
                        value="Blue"
                        className="form-check-input ms-2"
                      />
                      <label className="form-check-label text-primary">
                        Blue
                      </label>
                      <Field
                        type="checkbox"
                        name="colors"
                        value="Red"
                        className="form-check-input ms-2"
                      />
                      <label className="form-check-label text-danger">
                        Red
                      </label>
                    </div>
                    <ErrorMessage
                      name="colors"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>


                  <Form.Group controlId="formtags" className="mt-3">
                    <Form.Label>Tags</Form.Label>
                    <div role="group" aria-labelledby="checkbox-group">
                      <Field
                        type="checkbox"
                        name="tags"
                        value="electronic"
                        className="form-check-input"
                      />
                      <label className="form-check-label ">
                        Electronic
                      </label>
                      <Field
                        type="checkbox"
                        name="tags"
                        value="led"
                        className="form-check-input ms-2"
                      />
                      <label className="form-check-label ">
                        LED
                      </label>
                      <Field
                        type="checkbox"
                        name="tags"
                        value="steels"
                        className="form-check-input ms-2"
                      />
                      <label className="form-check-label ">
                        Steels
                      </label>
                      <Field
                        type="checkbox"
                        name="tags"
                        value="55 inches"
                        className="form-check-input ms-2"
                      />
                      <label className="form-check-label ">
                        55 Inches
                      </label>
                     
                    </div>
                    <ErrorMessage
                      name="colors"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Add
                    </Button>
                  </Modal.Footer>
                </FormikForm>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </div>
      <ToastContainer />
    </Box>
  );
}

export default CategoryIndex;
