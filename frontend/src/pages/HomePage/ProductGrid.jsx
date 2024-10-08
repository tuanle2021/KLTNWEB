import React from "react";
import ProductCart from "../../components/ProductComponent/ProductCart";
import { ProductGrid as StyledProductGrid } from "./style";

const ProductGrid = React.forwardRef(({ products }, ref) => (
  <StyledProductGrid ref={ref}>
    {products.map((product) => (
      <ProductCart key={product._id} product={product} />
    ))}
  </StyledProductGrid>
));

export default React.memo(ProductGrid);
