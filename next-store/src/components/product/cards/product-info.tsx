import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StoreProductsRes } from "@medusajs/medusa";

const ProductInfo = ({ product }: StoreProductsRes) => {
  return (
    <Accordion type="single" collapsible className="w-full p-2 md:w-1/2">
      <AccordionItem value="item-1">
        <AccordionTrigger>About the product</AccordionTrigger>
        <AccordionContent>
          <p className="text-xl">{product.title}</p>
          <br />
          <p>
            Description: {product?.description || "No description available"}
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Variants</AccordionTrigger>
        <AccordionContent className="flex justify-between flex-wrap">
          {product.variants.map((variant) => (
            <div key={variant.id}>
              <p>{variant.title}</p>

              <p>{variant.prices[0].amount}</p>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Refund Policy</AccordionTrigger>
        <AccordionContent>
          All products are refundable within 7-days of purchase.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductInfo;
