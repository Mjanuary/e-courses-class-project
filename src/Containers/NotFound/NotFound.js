import React from "react";

const NotFound = (props) => {
  return (
    <div className="container">
      <div className="p-4 bg-white mx-2 shadow-sm rounded">
        <h1 className="text-center display-1 text-danger bounceIn animated">
          404
        </h1>
        <h3 className="text-center text-secondary fadeIn animated delay-4ms">
          Page does not found!
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
