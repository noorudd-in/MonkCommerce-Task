import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
  GripVertical,
} from "lucide-react";
import ShowProductsModal from "./ShowProductsModal";
import ListSingleVariant from "./ListSingleVariant";

const ListSingleProduct = ({
  product,
  index,
  updateProduct,
  updateDiscount,
  updateVariants,
  deleteItem,
  showDelete,
  handleDragStart,
  handleDrop,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showVariants, setShowVariants] = useState(false);

  const updateProductDetails = (data) => {
    const newProducts = [];
    data.map((ele) => {
      newProducts.push({
        productId: ele.id,
        productName: ele.title,
        discount: false,
        discountValue: 0,
        discountType: "percent",
        variants: ele?.variants?.length > 0 ? ele.variants : null,
      });
    });
    updateProduct(index, newProducts);
  };

  const handleDiscount = (type, value) => {
    const updatedProduct = {
      ...product,
      [type]: value,
    };
    updateDiscount(index, updatedProduct);
  };

  const handleDelete = (type, variantId = null) => {
    if (type == "product") {
      deleteItem(index, "product");
    } else {
      // Dont' delete varaint if it's less tha 2.
      if (product.variants.length < 2) {
        return;
      }
      let newVariants = [...product.variants];
      newVariants = newVariants.filter((ele) => ele.id != variantId);
      const newProduct = { ...product, variants: newVariants };
      deleteItem(index, "variant", newProduct);
      if (newVariants.length < 2) {
        setShowVariants(false);
      }
    }
  };

  const updateProductVariants = (data) => {
    updateVariants(index, data);
  };

  return (
    <>
      <div
        className="flex flex-col lg:flex-row gap-2 my-2"
        draggable
        onDragStart={(event) => handleDragStart(event, index)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(event) => handleDrop(event, index)}
      >
        <div className="flex items-center w-full lg:w-6/12">
          <div>
            <GripVertical />
          </div>
          <label className="w-full input input-bordered flex items-center gap-2">
            <input
              type="button"
              className="grow text-left"
              placeholder="Select Product"
              value={
                product.productName ? product.productName : "Select Product"
              }
            />
            <Pencil
              className="cursor-pointer hover:text-emerald-500"
              onClick={() => setShowModal(true)}
            />
          </label>
        </div>
        <div className="lg:w-6/12">
          {product.discount ? (
            <div className="flex gap-1 items-center">
              <input
                type="number"
                value={product.discountValue}
                className="input input-bordered w-5/12 max-w-xs"
                onChange={(e) =>
                  handleDiscount("discountValue", e.target.value)
                }
              />
              <select
                className="select select-bordered w-5/12 max-w-xs"
                defaultValue="percent"
                onChange={(e) => handleDiscount("discountType", e.target.value)}
              >
                <option value="percent">% off</option>
                <option value="flat">flat off</option>
              </select>
              {showDelete && (
                <Trash2
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete("product")}
                />
              )}
            </div>
          ) : (
            <button
              className="btn btn-accent w-full"
              onClick={() => handleDiscount("discount", true)}
            >
              Add Discount
            </button>
          )}
        </div>
      </div>
      {product?.variants?.length > 1 && (
        <div className="flex justify-end">
          {showVariants ? (
            <div
              className="flex gap-1 text-blue-500 cursor-pointer"
              onClick={() => setShowVariants(false)}
            >
              <h1 className="underline">Hide Variants</h1> <ChevronUp />
            </div>
          ) : (
            <div
              className="flex gap-1 text-blue-500 cursor-pointer"
              onClick={() => setShowVariants(true)}
            >
              <h1 className="underline ">Show Variants</h1>
              <ChevronDown />
            </div>
          )}
        </div>
      )}

      {showVariants && (
        <div>
          {product?.variants.map((variant, index) => {
            return (
              <ListSingleVariant
                key={variant.id}
                index={index}
                data={variant}
                product={product}
                handleDelete={handleDelete}
                updateProductVariants={updateProductVariants}
                handleDiscount={handleDiscount}
              />
            );
          })}
        </div>
      )}

      {/* Show Modal once user clicks on edit button */}
      {showModal && (
        <ShowProductsModal
          setShowModal={setShowModal}
          updateProduct={updateProductDetails}
        />
      )}
    </>
  );
};

export default ListSingleProduct;
