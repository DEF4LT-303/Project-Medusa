import { StoreProductsRes } from "@medusajs/medusa";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

const ProductCard = ({ product }: StoreProductsRes) => {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{product.title}</h4>

        <small className="text-default-500">
          {product.variants[0].prices[0].currency_code.toLocaleUpperCase()}{" "}
          {product.variants[0].prices[0].amount}
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
  );
};

export default ProductCard;
