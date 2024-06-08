"use client";

import { cn } from "@/lib/utils";
import { ProductCollection } from "@medusajs/medusa";
import { ChevronDown } from "lucide-react";
import { useProducts } from "medusa-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface NavItemProps {
  collection: ProductCollection;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({
  isAnyOpen,
  collection,
  handleOpen,
  isOpen,
}: NavItemProps) => {
  const { products, isLoading } = useProducts({
    collection_id: [collection.id],
    limit: 3,
  });

  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {collection.title}
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            aria-hidden="true"
          />
          <div className="relative bg-background dark:bg-background">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {products &&
                    products.map((item) => (
                      <div
                        key={item.id}
                        className="group relative text-base sm:text-sm"
                      >
                        <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                          <Image
                            src={item.thumbnail || ""}
                            alt="product collection image"
                            fill
                            className="object-cover object-center"
                          />
                        </div>

                        <Link
                          href={`/products/${item.id}`}
                          className="mt-6 block font-medium text-muted-foreground"
                        >
                          {item.title}
                        </Link>

                        <p className="mt-1" aria-hidden="true">
                          Shop now
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
