import { addToCart } from "@/app/actions/cart-actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProductOption, StoreProductsRes } from "@medusajs/medusa";
import { isEqual } from "lodash";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const onlyUnique = (value: unknown, index: number, self: unknown[]) =>
  self.indexOf(value) === index;

const ProductOptions = ({
  option,
  current,
  updateOption,
  disabled,
}: {
  option: ProductOption;
  current: string;
  updateOption: (option: Record<string, string>) => void;
  disabled: boolean;
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique);
  return (
    <div className="flex flex-wrap gap-3">
      {filteredOptions.map((v) => (
        <Button
          variant="secondary"
          className={cn(
            "border-ui-border-base border text-small-regular h-10 rounded-rounded p-2 flex-1 hover:bg-blue-400",
            {
              "border-ui-border-interactive": v === current,
              "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
                v !== current,
              "bg-blue-500": v === current,
            }
          )}
          key={v}
          onClick={() => updateOption({ [option.id]: v })}
          disabled={disabled}
        >
          {v}
        </Button>
      ))}
    </div>
  );
};

const ProductVariant = ({ product }: StoreProductsRes) => {
  const [options, setOptions] = useState<Record<string, string>>({});
  const [isAdding, setIsAdding] = useState(false);

  const countryCode = useParams().countryCode as string;

  const variants = product.variants;

  // initialize the option state
  useEffect(() => {
    const optionObj: Record<string, string> = {};

    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined });
    }

    setOptions(optionObj);
  }, [product]);

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};

    for (const variant of variants) {
      if (!variant.options || !variant.id) continue;

      const temp: Record<string, string> = {};

      for (const option of variant.options) {
        temp[option.option_id] = option.value;
      }

      map[variant.id] = temp;
    }

    return map;
  }, [variants]);

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined;

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key;
      }
    }

    return variants.find((v) => v.id === variantId);
  }, [options, variantRecord, variants]);

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1 && variants[0].id) {
      setOptions(variantRecord[variants[0].id]);
    }
  }, [variants, variantRecord]);

  // update the options when a variant is selected
  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update });
  };

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (variant && !variant.manage_inventory) {
      return true;
    }

    // If we allow back orders on the variant, we can add to cart
    if (variant && variant.allow_backorder) {
      return true;
    }

    // If there is inventory available, we can add to cart
    if (variant?.inventory_quantity && variant.inventory_quantity > 0) {
      return true;
    }

    // Otherwise, we can't add to cart
    return false;
  }, [variant]);

  const actionsRef = useRef<HTMLDivElement>(null);

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!variant?.id) return null;

    setIsAdding(true);

    await addToCart({
      variantId: variant.id,
      quantity: 1,
      countryCode,
    });

    setIsAdding(false);
  };

  const price = useMemo(() => {
    let rounded_price = 0;
    if (variant) {
      const base_price = variant.prices.find(
        (p) => p.currency_code === "bdt"
      )?.amount;
      if (base_price) {
        rounded_price = base_price / 100;
      }
      return rounded_price;
    }

    return null;
  }, [variant]);

  return (
    <div className="flex flex-col justify-between items-center gap-5 w-full md:w-1/2 h-full ">
      <div className="flex flex-col gap-2 justify-start items-start w-full">
        <p className="font-semibold text-lg">Choose a variant</p>
        <div className="flex flex-col justify-between w-full gap-3">
          {product.options &&
            product.options.map((option) => (
              <>
                <div key={option.id}>{option.title}</div>
                <ProductOptions
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                  disabled={false}
                />
              </>
            ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        {variant && <p className="font-semibold">Price: BDT {price}</p>}
        <Button
          variant="secondary"
          className="w-full hover:bg-emerald-400"
          onClick={handleAddToCart}
          disabled={!inStock || !variant || isAdding}
        >
          {!variant
            ? "Select variant"
            : !inStock
            ? "Out of stock"
            : "Add to cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductVariant;
