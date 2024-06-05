"use client";

import { useProducts } from "medusa-react";

const Products = () => {
  const { products, isLoading } = useProducts();

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ul>
      {products?.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
};

export default Products;
