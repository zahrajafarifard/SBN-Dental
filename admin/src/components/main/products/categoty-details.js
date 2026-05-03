import React from "react";

const CategotyDetails = ({
  category,
  setShowCategoryItems,
  setFormValues,
  setCategoryId,
}) => {
  return (
    <div className={` w-full relative z-50  bg-white  overflow-hidden py-2`}>
      <div
        onClick={() => {
          setShowCategoryItems(false);
          setFormValues((prev) => ({ ...prev, category: category?.name }));
          setCategoryId(category?.id);
        }}
        className="hover:bg-[#F7FAFD] p-4"
      >
        {category?.name}
      </div>
    </div>
  );
};

export default CategotyDetails;
