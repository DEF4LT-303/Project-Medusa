import { Separator } from "@/components/ui/separator";
import { StoreCollectionsRes } from "@medusajs/medusa";
import { useProducts } from "medusa-react";
import ProductCard from "../cards/product-card";

const ProductCollection = ({ collection }: StoreCollectionsRes) => {
  const { products, isLoading } = useProducts({
    collection_id: [collection.id],
  });

  return (
    <div>
      <div>
        <p className="font-semibold text-lg mt-10 mb-2">{collection.title}</p>
        <Separator />
      </div>

      {isLoading && <span>Loading...</span>}
      {products && !products.length && <span>No Products</span>}
      {products && products.length > 0 && (
        <div className="flex flex-wrap justify-center md:justify-start items-start gap-4 p-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCollection;
