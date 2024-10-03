import { useState } from "react";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";
import ShowProductsModal from "./ShowProductsModal";
import ListSingleVariant from "./ListSingleVariant";

const ListSingleProduct = ({
  product,
  index,
  updateProduct,
  updateDiscount,
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

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 my-2">
        <div className="w-full lg:w-8/12">
          <label className="input input-bordered flex items-center gap-2">
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
        <div className="lg:w-4/12">
          {product.discount ? (
            <div className="flex gap-2">
              <input
                type="number"
                value={product.discountValue}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  handleDiscount("discountValue", e.target.value)
                }
              />
              <select
                className="select select-bordered w-full max-w-xs"
                defaultValue="percent"
                onChange={(e) => handleDiscount("discountType", e.target.value)}
              >
                <option value="percent">% off</option>
                <option value="flat">flat off</option>
              </select>
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
      {product?.variants?.[0] != undefined && (
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
          {product?.variants.map((variant) => {
            return <ListSingleVariant />;
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
