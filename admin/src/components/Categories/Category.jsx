import React, { useState, useEffect } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import {
  CategoryContainer,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  SubmitButton,
  CategoryTable,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
  CategoryInner,
  CategoryForm,
} from "./styles";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../redux/slices/categorySlice";
import { fetchBrands } from "../../redux/slices/brandSlice";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const { brands } = useSelector((state) => state.brands);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brands: [],
  });
  console.log(categories, brands);
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleBrandChange = (e) => {
    const selectedBrands = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      brands: selectedBrands,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateCategory({ id: editCategoryId, categoryData: formData }));
    } else {
      dispatch(addCategory(formData));
    }
    setFormData({ name: "", description: "", brands: [] });
    setEditMode(false);
    setEditCategoryId(null);
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
      brands: category.brands.map((brand) => brand._id),
    });
    setEditMode(true);
    setEditCategoryId(category._id);
  };

  const handleDelete = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(categoryId));
        Swal.fire("Deleted!", "Your category has been deleted.");
      }
    });
  };

  return (
    <CategoryContainer>
      {loading && (
        <div className="loading">
          <div></div>
        </div>
      )}
      {error && <p>{error}</p>}
      <h2>Categories</h2>

      <CategoryInner>
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
            <FormLabel>Brands</FormLabel>
            <select
              multiple
              name="brands"
              value={formData.brands}
              onChange={handleBrandChange}
            >
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <SubmitButton type="submit">
              {editMode ? "Update category" : "Create category"}
            </SubmitButton>
          </FormGroup>
        </CategoryForm>

        <CategoryTable>
          <thead>
            <TableRow>
              <TableHeader></TableHeader>
              <TableHeader>ID</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Brands</TableHeader>
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
                  {category.brands.map((brand) => brand.name).join(", ")}
                </TableCell>
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
