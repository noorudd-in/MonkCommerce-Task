export const SingleProductRow = ({
  label,
  image,
  isChecked,
  onChange,
  inDeterminate,
}) => {
  return (
    <div className="flex gap-2 mt-5 my-2 items-center">
      <input
        type="checkbox"
        className="checkbox"
        checked={isChecked || false}
        ref={(ele) => ele && (ele.indeterminate = inDeterminate)}
        onChange={onChange}
      />
      <div className="flex gap-2 items-center">
        <div className="avatar">
          <div className="mask mask-squircle h-12 w-12">
            <img src={image} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <h1>{label}</h1>
      </div>
    </div>
  );
};

export const SingleVariantRow = ({
  label,
  isChecked,
  onChange,
  inDeterminate,
}) => {
  return (
    <div className="flex gap-2 my-2">
      <input
        type="checkbox"
        className="checkbox"
        checked={isChecked || false}
        ref={(ele) => ele && (ele.indeterminate = inDeterminate)}
        onChange={onChange}
      />
      <h1>{label}</h1>
    </div>
  );
};
