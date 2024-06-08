"use client";

import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import { useCollections } from "medusa-react";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const { collections, isLoading } = useCollections({ limit: 3 });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));
  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {collections &&
        collections.map((collection, i) => {
          const handleOpen = () => {
            if (activeIndex === i) {
              setActiveIndex(null);
            } else {
              setActiveIndex(i);
            }
          };
          const isOpen = i === activeIndex;
          return (
            <NavItem
              collection={collection}
              handleOpen={handleOpen}
              isOpen={isOpen}
              key={collection.id}
              isAnyOpen={isAnyOpen}
            />
          );
        })}
    </div>
  );
};

export default NavItems;
