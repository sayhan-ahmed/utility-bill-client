import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 grid place-items-center bg-black/20 z-50">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-transparent" />
    </div>
  );
};

export default Loader;
