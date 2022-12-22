import React from "react";

const Container = ({ children, className }) => {
  return (
    <div
      className={`w-full flex items-center justify-center flex-col bg-cover bg-center ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
