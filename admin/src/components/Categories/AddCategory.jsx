import React, { useState } from "react";
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

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Men clothes", description: "Men clothes" },
    { id: 2, name: "Women fashion", description: "Fashions for Women" },
    { id: 3, name: "Kids clothes", description: "Clothes for kids" },
  ]);

  return (
    <CategoryContainer>
      <h2>Categories</h2>

      <CategoryInner>
        {/* Form thêm danh mục */}
        <CategoryForm>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <div className="imput">
              <FormInput type="text" placeholder="Type here" />
            </div>
          </FormGroup>

          <FormGroup>
            <FormLabel>Images</FormLabel>
            <FileInput type="file" multiple />
          </FormGroup>

          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormTextarea placeholder="Type here" />
          </FormGroup>

          <FormGroup>
            <SubmitButton>Create category</SubmitButton>
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
              <TableRow key={category.id}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <ActionButton>...</ActionButton>
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
