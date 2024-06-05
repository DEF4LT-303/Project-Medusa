import { StoreProductsRes } from "@medusajs/medusa";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";

const CartItem = ({ product }: StoreProductsRes) => {
  const image = "";

  return (
    <div className="space-y-3 py-2">
      <div className="flex justify-between  gap-4">
        <div className="flex items-start space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image === "string" ? (
              <Image
                src={product.thumbnail ?? ""}
                width={100}
                height={100}
                className="absolute object-cover h-16 w-16"
                alt="Product Image"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.title}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {product.handle}
            </span>
            <span className="line-clamp-1 text-xs mt-1 text-muted-foreground">
              {product.variants[0].prices[0].amount}
            </span>
          </div>
        </div>

        <div className="flex flex-col font-medium ">
          <div className="text-xs text-muted-foreground">
            <button className="flex items-center gap-0.5 mr-2">
              <X className="h-3 w-3" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
