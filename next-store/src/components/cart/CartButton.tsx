import { enrichLineItems, retrieveCart } from "@/app/actions/cart-actions";
import { LineItem } from "@medusajs/medusa";
import { Loader2 } from "lucide-react";
import { Cart } from "medusa-react";
import { useEffect, useState } from "react";
import CartSheet from "./cart-template";

type CartState = Omit<Cart, "refundable_amount" | "refunded_total"> | null;

const CartButton = () => {
  const [cart, setCart] = useState<CartState>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await retrieveCart();
      if (cartData?.items.length) {
        const enrichedItems = await enrichLineItems(
          cartData.items,
          cartData.region_id
        );
        cartData.items = enrichedItems as LineItem[];
      }
      setCart(cartData);
    };

    fetchCart();
  }, [cart]);

  if (!cart) {
    return (
      <div>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }

  return <CartSheet cart={cart} />;
};

export default CartButton;
