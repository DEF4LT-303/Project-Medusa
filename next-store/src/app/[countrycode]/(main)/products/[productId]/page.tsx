"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductInfo from "@/components/product/cards/product-info";
import ProductVariant from "@/components/product/cards/product-variant";
import Thumbnail from "@/components/product/cards/Thumbnail";
import { useProduct } from "medusa-react";

const SingleProductPage = ({ params }: { params: { productId: string } }) => {
  const { product, isLoading } = useProduct(params.productId);
  return (
    <MaxWidthWrapper>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center">Loading...</div>
        ) : !product ? (
          <div className="flex justify-center items-center">
            Product not found
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-center items-start gap-5 p-5">
            <ProductInfo product={product} />
            <Thumbnail thumbnail={product?.thumbnail} />
            <ProductVariant product={product} />
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default SingleProductPage;
