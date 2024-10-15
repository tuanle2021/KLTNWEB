import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  addProduct,
  addImage,
  removeImage,
  clearImages,
} from "../../redux/slices/productSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";

import {
  FormContainer,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  ImageUploadContainer,
  TagInput,
  FormSelect,
  CheckboxGroup,
  SubmitButton,
} from "./styles"; // Import các styled-components từ file styles

const AddItemForm = () => {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.products);
  const { categories = [] } = useSelector((state) => state.categories) || {};
  const initialFormData = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    publish: true,
  };
  const [formData, setFormData] = useState(initialFormData);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !error) {
      setFormData(initialFormData);
      dispatch(clearImages());
    }
  }, [loading, error]);

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

    // Nếu không có lỗi, tiến hành submit
    console.log("form data:", formData);
    dispatch(addProduct({ ...formData, images }));
  };

  return (
    <FormContainer as="form" onSubmit={handleSubmit}>
      <h2>Create product</h2>

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
              <img src={URL.createObjectURL(image)} alt="product" />
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

      {/* Publish checkbox */}
      <FormGroup>
        <CheckboxGroup>
          <input
            type="checkbox"
            id="publish"
            name="publish"
            checked={formData.publish}
            onChange={handleInputChange}
          />
          <label htmlFor="publish">Publish on site</label>
        </CheckboxGroup>
      </FormGroup>

      {/* Submit button */}
      <FormGroup>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit item"}
        </SubmitButton>
      </FormGroup>

      {error && <p>Error: {error}</p>}
    </FormContainer>
  );
};

export default AddItemForm;
