import { useEffect, useState } from "react";
import { SingleProductRow, SingleVariantRow } from "./SingleRow";

const ProductSelection = ({
  products,
  selectedProducts,
  setSelectedProducts,
  listRef,
  handleScroll,
}) => {
  // Checking if variants are selcted
  const isVariantSelected = (productId, variantId) => {
    const product = selectedProducts.find((p) => p.id === productId);
    return product?.variants?.some((v) => v.id === variantId);
  };

  // Check if all variants are selected or not. If yes then make parent checkbox as true
  const areAllVariantsSelected = (product) => {
    return product.variants.every((variant) =>
      isVariantSelected(product.id, variant.id)
    );
  };

  // Make parent checkbox as indeteminate if any one varaints is selected
  const isAnyVariantSelected = (product) => {
    return product.variants.some((variant) =>
      isVariantSelected(product.id, variant.id)
    );
  };

  // Toggle Product Selection checkbox
  const handleProductChange = (product) => {
    const isSelected = selectedProducts.some((p) => p.id === product.id);
    let updatedSelection;

    if (isSelected) {
      // Remoce product is product is already selected
      updatedSelection = selectedProducts.filter((p) => p.id !== product.id);
    } else {
      // Add product and all its variants
      updatedSelection = [
        ...selectedProducts,
        { ...product, variants: [...product.variants] },
      ];
    }
    setSelectedProducts(updatedSelection);
  };

  // Toggle variants selection checkbox
  const handleVariantChange = (productId, variant) => {
    const productExists = selectedProducts.find((p) => p.id === productId);
    let updatedSelection;

    if (productExists) {
      // If product exist then add variant to the existing variants object
      const isVariantSelected = productExists.variants.some(
        (v) => v.id === variant.id
      );

      if (isVariantSelected) {
        // Remove the variant from the product since it's already selected.
        updatedSelection = selectedProducts.map((p) =>
          p.id === productId
            ? {
                ...p,
                variants: p.variants.filter((v) => v.id !== variant.id),
              }
            : p
        );
      } else {
        // Add the variant to the product sice user selected it.
        updatedSelection = selectedProducts.map((p) =>
          p.id === productId ? { ...p, variants: [...p.variants, variant] } : p
        );
      }

      // Remove product from selectedProducts if no variants are selected
      updatedSelection = updatedSelection.filter((p) => p.variants.length > 0);
    } else {
      // Create new product object with the selected variant
      updatedSelection = [
        ...selectedProducts,
        { id: productId, variants: [variant] },
      ];
    }

    setSelectedProducts(updatedSelection);
  };

  useEffect(() => {
    console.log("Selected Products:", selectedProducts);
  }, [selectedProducts]);

  return (
    <div
      ref={listRef}
      className="max-h-96 overflow-y-auto"
      onScroll={handleScroll}
    >
      {products?.map((product) => {
        const isProductChecked = areAllVariantsSelected(product);
        const isProductPartial =
          isAnyVariantSelected(product) && !areAllVariantsSelected(product);

        return (
          <div key={product.id}>
            <SingleProductRow
              label={product.title}
              isChecked={isProductChecked}
              inDeterminate={isProductPartial}
              onChange={() => handleProductChange(product)}
            />
            <div className="ml-10">
              {product.variants.length > 1 &&
                product.variants?.map((variant) => (
                  <SingleVariantRow
                    key={variant.id}
                    label={variant.title}
                    isChecked={isVariantSelected(product.id, variant.id)}
                    onChange={() => handleVariantChange(product.id, variant)}
                  />
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductSelection;
