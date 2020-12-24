import React from "react";
// import PropTypes from "prop-types";

const BackDrop = ({ close }) => {
  return (
    <div className="backDrop fadeIn animated" onClick={close}>
      <h6>Click to close</h6>
    </div>
  );
};

BackDrop.propTypes = {};

export default BackDrop;
