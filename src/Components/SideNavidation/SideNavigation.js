import React from "react";
// import PropTypes from 'prop-types'
import { NavLink } from "react-router-dom";
const SideNavigation = (props) => {
  return (
    <div className="bg-dark mt-n4 mb-3 text-center p-2">
      <nav className="my-2 my-md-0 mr-md-3 text-white navigation-link">
        <NavLink
          className="p-2 btn d-inline-block mr-2 btn-outline-info btn-sm text-white rounded"
          to="/create-video-course"
        >
          Create Video Course
        </NavLink>
        <NavLink
          className="p-2 btn d-inline-block mr-2 btn-outline-info btn-sm text-white rounded btn"
          to="/create-blog-course"
        >
          Create a Blog
        </NavLink>
        <NavLink
          className="p-2 btn d-inline-block mr-2 btn-outline-info btn-sm text-white rounded"
          to="/create-event"
        >
          Add online session
        </NavLink>
      </nav>
    </div>
  );
};

SideNavigation.propTypes = {};

export default SideNavigation;
