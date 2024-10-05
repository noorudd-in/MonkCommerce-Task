import { GripVertical, Trash2 } from "lucide-react";

const ListSingleVariant = ({ data, product, handleDelete }) => {
  return (
    <div className="ml-5 flex flex-col lg:flex-row gap-2">
      <div className="flex items-center w-full lg:w-6/12">
        <GripVertical />
        <input
          type="text"
          value={data.title}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="flex items-center gap-1 lg:w-6/12">
        <input
          type="text"
          value={product.discountValue}
          className="input input-bordered w-5/12 max-w-xs"
          readOnly
        />
        <select
          className="select select-bordered w-5/12 max-w-xs"
          defaultValue="percent"
          readOnly
          value={product.discountType}
        >
          <option value="percent">% off</option>
          <option value="flat">flat off</option>
        </select>
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
