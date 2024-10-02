import { Pencil } from "lucide-react";

const ListSingleProduct = ({ data, index, edit }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-2 my-2">
      <div className="w-full">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="button"
            className="grow text-left"
            value="Select Product"
          />
          <Pencil
            className="cursor-pointer hover:text-emerald-500"
            onClick={() => edit(index)}
          />
        </label>
      </div>
      <button className="btn btn-accent">Add Discount</button>
    </div>
  );
};

export default ListSingleProduct;
