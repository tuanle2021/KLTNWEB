import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

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
  const [tags, setTags] = useState(["Clothes", "Men", "Fashion"]);

  return (
    <FormContainer>
      <h2>Create product</h2>

      {/* Tên sản phẩm */}
      <FormGroup>
        <FormLabel>Product title</FormLabel>
        <FormInput type="text" placeholder="Writing" />
      </FormGroup>

      {/* Label */}
      <FormGroup>
        <FormLabel>Label</FormLabel>
        <FormTextarea placeholder="Type here" />
      </FormGroup>

      {/* Ảnh sản phẩm */}
      <FormGroup>
        <FormLabel>Images</FormLabel>
        <ImageUploadContainer>
          <img
            src="https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg"
            alt="product"
          />
          <img
            src="https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg"
            alt="product"
          />
          <img
            src="https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg"
            alt="product"
          />
          <img
            src="https://res.cloudinary.com/dihhw7jo1/image/upload/v1727766768/products/MacBook%20Air%2013%20inch%20M1%204.jpg.jpg"
            alt="product"
          />
          <div className="upload-box">
            <div>
              <IoCloudUploadOutline />
            </div>
            <span>Upload</span>
          </div>
        </ImageUploadContainer>
      </FormGroup>

      {/* Tags */}
      <FormGroup>
        <FormLabel>Tags</FormLabel>
        <TagInput
          type="text"
          value={tags.join(", ")}
          onChange={(e) => setTags(e.target.value.split(", "))}
        />
      </FormGroup>

      {/* Category */}
      <FormGroup>
        <FormLabel>Category</FormLabel>
        <FormSelect>
          <option>Select</option>
        </FormSelect>
      </FormGroup>

      {/* Giá sản phẩm */}
      <FormGroup>
        <FormLabel>Price</FormLabel>
        <FormInput type="text" placeholder="Type here" />
      </FormGroup>

      {/* Publish checkbox */}
      <FormGroup>
        <CheckboxGroup>
          <input type="checkbox" id="publish" />
          <label htmlFor="publish">Publish on site</label>
        </CheckboxGroup>
      </FormGroup>

      {/* Submit button */}
      <FormGroup>
        <SubmitButton>Submit item</SubmitButton>
      </FormGroup>
    </FormContainer>
  );
};

export default AddItemForm;
