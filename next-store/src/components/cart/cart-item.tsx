"use client";

import { deleteLineItem } from "@/app/actions/cart-actions";
import { LineItem } from "@medusajs/medusa";
import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const CartItem = ({ item }: { item: LineItem }) => {
  const image = item?.thumbnail;

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false);
    });
  };

  return (
    <div className="space-y-3 py-2">
      <div className="flex justify-between  gap-4">
        <div className="flex items-start space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image === "string" ? (
              <Image
                src={image || ""}
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
              {item?.title}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {item?.variant.title}
            </span>
            <span className="line-clamp-1 text-xs mt-1 text-muted-foreground">
              {item?.quantity} x {item?.unit_price}
            </span>
          </div>
        </div>

        <div className="flex flex-col font-medium ">
          <div className="text-xs text-muted-foreground">
            {isDeleting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <button
                className="flex items-center gap-0.5 mr-2"
                onClick={() => handleDelete(item.id)}
              >
                <X className="h-3 w-3" />
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
