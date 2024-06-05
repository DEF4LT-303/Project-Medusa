"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { Badge } from "@nextui-org/react";
import { Separator } from "@radix-ui/react-separator";
import { useProducts } from "medusa-react";
import CartItem from "./cart-item";

const Cart = () => {
  const { products, isLoading } = useProducts({ limit: 3 });
  const itemCount = 3;
  const fee = 1;

  return (
    <Sheet>
      <SheetTrigger
        aria-hidden="true"
        className="group -m-2 flex items-center p-2 relative"
      >
        {itemCount > 0 ? (
          <Badge
            color="primary"
            content={itemCount}
            shape="circle"
            className="absolute top-1 -right-0 flex items-center justify-center w-5 h-5 bg-red-500 text-primary-background text-sm rounded-full shadow-md"
          >
            <ShoppingCart className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
          </Badge>
        ) : (
          <ShoppingCart className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
        )}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle> Cart</SheetTitle>
        </SheetHeader>
        {itemCount > 0 && products ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea>
                {products.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </ScrollArea>
            </div>

            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{fee}</span>
                </div>

                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{fee}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="text-xl font-semibold">Your Cart is Empty</div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
