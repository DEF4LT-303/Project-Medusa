"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCollection from "@/components/product/template/product-collection";
import { useCollections } from "medusa-react";

const Products = () => {
  const { collections, isLoading } = useCollections();

  return (
    <div>
      <MaxWidthWrapper>
        <>
          <p className="flex justify-center text-3xl mt-3 p-3 font-bold text-blue-500">
            All Products
          </p>
          {isLoading && <span>Loading...</span>}

          {collections && collections.length > 0 && (
            <div className="flex flex-col mt-5">
              {collections.map((collection) => (
                <ProductCollection
                  key={collection.id}
                  collection={collection}
                />
              ))}
            </div>
          )}
        </>
      </MaxWidthWrapper>
    </div>
  );
};

export default Products;
