import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import {
  addProduct,
  updateProduct,
  addImage,
  removeImage,
  clearImages,
  fetchProductById,
} from "../../redux/slices/productSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";

import {
  FormContainer,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  ImageUploadContainer,
  FormSelect,
  SubmitButton,
} from "./styles"; // Import các styled-components từ file styles

const AddItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.products);
  const { categories = [] } = useSelector((state) => state.categories) || {};
  const initialFormData = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          const product = action.payload;
          setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category_id: product.category_id,
          });
          dispatch(clearImages());
          product.images.forEach((image) => dispatch(addImage(image)));
        }
      });
    } else {
      setFormData(initialFormData);
      dispatch(clearImages());
    }
  }, [id, dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => dispatch(addImage(file)));
  };

  const handleUploadBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra xem các trường đã được điền đầy đủ chưa
    const { name, description, price, stock, category_id } = formData;
    if (!name || !description || !price || !stock || !category_id) {
      alert("Please fill out all required fields.");
      return;
    }

    if (id) {
      dispatch(
        updateProduct({ id, productData: { ...formData, images } })
      ).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          navigate(`/products`);
        }
      });
    } else {
      dispatch(addProduct({ ...formData, images })).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          navigate(`/products`);
        }
      });
    }
  };

  return (
    <FormContainer as="form" onSubmit={handleSubmit}>
      <h2>{id ? "Update product" : "Create product"}</h2>
      {id && (
        <SubmitButton onClick={() => navigate(`/products`)}>
          Back to products
        </SubmitButton>
      )}
      {/* Tên sản phẩm */}
      <FormGroup>
        <FormLabel>Product title</FormLabel>
        <FormInput
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Writing"
        />
      </FormGroup>

      {/* Label */}
      <FormGroup>
        <FormLabel>Label</FormLabel>
        <FormTextarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Type here"
        />
      </FormGroup>

      {/* Ảnh sản phẩm */}
      <FormGroup>
        <FormLabel>Images</FormLabel>
        <ImageUploadContainer>
          {images.map((image, index) => (
            <div key={index} className="image-preview">
              {image instanceof File || image instanceof Blob ? (
                <img src={URL.createObjectURL(image)} alt="product" />
              ) : (
                <img src={image} alt="product" />
              )}
              <button
                type="button"
                onClick={() => dispatch(removeImage(index))}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="upload-box" onClick={handleUploadBoxClick}>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <div>
              <IoCloudUploadOutline />
            </div>
            <span>Upload</span>
          </div>
        </ImageUploadContainer>
      </FormGroup>

      {/* Category */}
      <FormGroup>
        <FormLabel>Category</FormLabel>
        <FormSelect
          name="category_id"
          value={formData.category_id}
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </FormSelect>
      </FormGroup>

      {/* Giá sản phẩm */}
      <FormGroup>
        <FormLabel>Price</FormLabel>
        <FormInput
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Type here"
        />
      </FormGroup>

      {/* Stock */}
      <FormGroup>
        <FormLabel>Stock</FormLabel>
        <FormInput
          type="text"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          placeholder="Type here"
        />
      </FormGroup>

      {/* Submit button */}
      <FormGroup>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Submitting..." : id ? "Update item" : "Submit item"}
        </SubmitButton>
      </FormGroup>

      {error && (
        <p>Error: {typeof error === "string" ? error : error.message}</p>
      )}
    </FormContainer>
  );
};

export default AddItemForm;
