import { GripVertical, Trash2 } from "lucide-react";

const ListSingleVariant = ({
  data,
  index,
  product,
  handleDelete,
  updateProductVariants,
  handleDiscount,
}) => {
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("draggedVariantIndex", index);
  };

  const handleDrop = (event, dropIndex) => {
    const draggedIndex = event.dataTransfer.getData("draggedVariantIndex");

    if (draggedIndex === dropIndex) {
      return;
    }

    const updatedItems = { ...product };
    const [draggedItem] = updatedItems.variants.splice(draggedIndex, 1);
    updatedItems.variants.splice(dropIndex, 0, draggedItem);
    console.log(updatedItems);
    updateProductVariants(updatedItems);

    //setProducts(updatedItems);
  };
  return (
    <div
      className="ml-5 my-2 flex flex-col lg:flex-row gap-2"
      draggable
      onDragStart={(event) => handleDragStart(event, index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(event) => handleDrop(event, index)}
    >
      <div
        className={`flex items-center w-full ${
          product.discount ? "lg:w-6/12" : "lg:w-11/12"
        }`}
      >
        <GripVertical />
        <input
          type="button"
          value={data.title}
          className="input input-bordered w-full rounded-full text-left"
        />
      </div>
      <div
        className={`flex items-center ${product.discount && "gap-1 lg:w-6/12"}`}
      >
        {product.discount && (
          <>
            <input
              type="text"
              value={product.discountValue}
              className="input input-bordered w-5/12 max-w-xs rounded-full"
              onChange={(e) => handleDiscount("discountValue", e.target.value)}
            />
            <select
              className="select select-bordered w-5/12 max-w-xs rounded-full"
              defaultValue="percent"
              value={product.discountType}
              onChange={(e) => handleDiscount("discountType", e.target.value)}
            >
              <option value="percent">% off</option>
              <option value="flat">flat off</option>
            </select>
          </>
        )}

        {product.variants.length > 1 && (
          <Trash2
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete("varaint", data.id)}
          />
        )}
      </div>
    </div>
  );
};

export default ListSingleVariant;
