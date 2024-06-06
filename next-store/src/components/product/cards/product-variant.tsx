import { Button } from "@/components/ui/button";

const ProductVariant = () => {
  return (
    <div className="flex flex-col justify-between items-center gap-3 w-full md:w-1/2 h-full ">
      <div className="flex flex-col gap-2 justify-start items-start w-full">
        <p className="font-semibold text-lg">Choose a variant</p>
        <div className="flex justify-between w-full gap-3">
          <Button className="w-full">Variant 1</Button>
          <Button className="w-full">Variant 2</Button>
          <Button className="w-full">Variant 3</Button>
        </div>
      </div>
      <div className="w-full">
        <Button variant="secondary" className="w-full hover:bg-emerald-400">
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductVariant;
