import React from "react";
import { MdFiberManualRecord } from "react-icons/md";

const TimeTable = (props) => {
  return (
    <div className="container">
      <div className="p-4 bg-primary text-white rounded">
        <h1 className="text-center display-1">
          {" "}
          <MdFiberManualRecord className="text-danger bounceIn animated infinite" />{" "}
          Time table
        </h1>
      </div>
    </div>
  );
};

TimeTable.propTypes = {};

export default TimeTable;
