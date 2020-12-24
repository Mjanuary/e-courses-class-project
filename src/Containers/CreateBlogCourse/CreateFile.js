import React, { useState } from "react";
// import PropTypes from 'prop-types'

const CreateFile = (props) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState({
    target: null,
    msg: "",
  });

  const submitData = () => {
    // plan_type
    if (name.length <= 1) {
      return setError({
        target: "name",
        msg: "Name is required",
      });
    }
    // plan_type
    if (url.length <= 1) {
      return setError({
        target: "url",
        msg: "URL is required",
      });
    }

    // submit the data
    props.success({
      name: name,
      url: url,
    });
    // close the modal
  };

  return (
    <div className="p-4 rounded bg-white border shadow-lg zoomIn animated faster">
      <h3 className="m-0 text-center">Add file</h3>
      <div className="form-group">
        <label htmlFor="name">File name</label>
        <input
          type="text"
          className={`form-control form-control-sm ${
            error.target === "name" ? "is-invalid" : ""
          }`}
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError({
              target: null,
              msg: "",
            });
          }}
          name="name"
        />
        {error.target === "name" && (
          <small id="thumbnailHelp" className="form-text text-danger ">
            {error.msg}
          </small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="name">Url</label>
        <input
          type="text"
          className={`form-control form-control-sm ${
            error.target === "name" ? "is-invalid" : ""
          }`}
          id="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError({
              target: null,
              msg: "",
            });
          }}
          name="url"
        />
        {error.target === "url" && (
          <small id="thumbnailHelp" className="form-text text-danger ">
            {error.msg}
          </small>
        )}
      </div>
      <div className="mt-2">
        <button className="btn btn-success" onClick={submitData} type="button">
          Add file
        </button>{" "}
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => props.close()}
        >
          Close
        </button>
      </div>
    </div>
  );
};

CreateFile.propTypes = {};

export default CreateFile;
