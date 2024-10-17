import React from "react";
import ProductCart from "../../components/ProductComponent/ProductCart";
import {
  ProductLists,
  ProductListContainer,
  Header,
  Line,
  Pagination,
  PaginationButton,
  PaginationInfo,
} from "./style";

const ProductListSection = ({
  products,
  handlePreviousPage,
  handleNextPage,
  currentPage,
  totalPages,
}) => (
  <>
    <Line />
    <ProductLists>
      <Header>
        <div>
          <h3>Category</h3>
          <h1>Brower By Category</h1>
        </div>
      </Header>
      <ProductListContainer>
        {products.map((product) => (
          <ProductCart key={product._id} product={product} />
        ))}
      </ProductListContainer>
      <Pagination>
        <PaginationButton
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>
        <PaginationInfo>Page {currentPage}</PaginationInfo>
        <PaginationButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </Pagination>
    </ProductLists>
  </>
);

export default React.memo(ProductListSection);
