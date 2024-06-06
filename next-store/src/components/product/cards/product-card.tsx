import { StoreProductsRes } from "@medusajs/medusa";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";

const ProductCard = ({ product }: StoreProductsRes) => {
  const BDT = product.variants[0].prices[2]?.amount / 100 || "NaN";
  const Unit =
    product.variants[0].prices[2]?.currency_code.toLocaleUpperCase() || "NaN";

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{product.title}</h4>

          <small className="text-default-500">
            {Unit} {BDT}
          </small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={product.thumbnail || ""}
            width={270}
          />
        </CardBody>
      </Card>
    </Link>
  );
};

export default ProductCard;
