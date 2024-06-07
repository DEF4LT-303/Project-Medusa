import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StoreProductsRes } from "@medusajs/medusa";

const ProductInfo = ({ product }: StoreProductsRes) => {
  return (
    <div className="w-full p-2 md:w-1/2 flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold underline">About he product:</p>
        <div className="flex flex-col gap-5">
          <p className="text-lg">{product?.title || "-"}</p>
          <p className="text-sm">{product?.description || "-"}</p>
        </div>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-2">
          <AccordionTrigger>Variants</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 justify-start gap-5">
            <div>
              <p>Weight</p>
              <p>{product?.weight || "-"}</p>
            </div>
            <div>
              <p>Length</p>
              <p>{product?.length || "-"}</p>
            </div>
            <div>
              <p>Height</p>
              <p>{product?.height || "-"}</p>
            </div>
            <div>
              <p>Width</p>
              <p>{product?.width || "-"}</p>
            </div>
            <div>
              <p>Material</p>
              <p>{product?.material || "-"}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Refund Policy</AccordionTrigger>
          <AccordionContent>
            All products are refundable within 7-days of purchase.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductInfo;
