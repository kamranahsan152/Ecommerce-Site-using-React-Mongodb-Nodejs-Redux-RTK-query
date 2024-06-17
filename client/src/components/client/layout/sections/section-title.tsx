import React from "react";
const SectionTitle = ({ title, path }: { title: string; path: string }) => {
  return (
    <div className="h-[100px] border-b pt-5 border-white bg-blue-500 mb-2 max-sm:h-[150px] max-sm:pt-8">
      <h1 className="text-4xl text-center mb-2 max-md:text-3xl max-sm:text-2xl text-white max-sm:mb-3">
        {title}
      </h1>
      <p className=" text-xl text-center max-sm:text-xl text-white mb-2">
        {path}
      </p>
    </div>
  );
};

export default React.memo(SectionTitle);
