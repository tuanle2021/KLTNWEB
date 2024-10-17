import React, { useState, useEffect } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";

import {
  CategoryContainer,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FileInput,
  SubmitButton,
  CategoryTable,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
  CategoryInner,
  CategoryForm,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../redux/slices/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      console.log("editMode", editMode);
      dispatch(updateCategory({ id: editCategoryId, categoryData: formData }));
    } else {
      console.log("editMode", editMode);
      dispatch(addCategory(formData));
    }
    setFormData({ name: "", description: "" });
    setEditMode(false);
    setEditCategoryId(null);
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
    });
    setEditMode(true);
    setEditCategoryId(category._id);
  };

  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(categoryId));
    }
  };

  if(loading) return <p>Loading...</p>
  if(error) return <p>{error}</p>

  return (
    <CategoryContainer>
      <h2>Categories</h2>

      <CategoryInner>
        {/* Form thêm danh mục */}
        <CategoryForm as="form" onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <div className="input">
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Type here"
              />
            </div>
          </FormGroup>

          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormTextarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Type here"
            />
          </FormGroup>

          <FormGroup>
            <SubmitButton type="submit">
              {editMode ? "Update category" : "Create category"}
            </SubmitButton>
          </FormGroup>
        </CategoryForm>

        {/* Bảng danh sách các danh mục */}
        <CategoryTable>
          <thead>
            <TableRow>
              <TableHeader></TableHeader>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Action</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>{category._id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <ActionButton
                    className="edit"
                    onClick={() => handleEdit(category)}
                  >
                    <FaPen />
                  </ActionButton>
                  <ActionButton
                    className="delete"
                    onClick={() => handleDelete(category._id)}
                  >
                    <FaTrashAlt />
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </CategoryTable>
      </CategoryInner>
    </CategoryContainer>
  );
};

export default Categories;
