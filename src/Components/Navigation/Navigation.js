import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdInsertEmoticon } from "react-icons/md";
import ProfileModal from "../ProfileModal/ProfileModal";
const Navigation = (props) => {
  const [profileOpen, setprofileOpen] = useState(false);
  return (
    <>
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-primary text-white border-bottom shadow-sm">
        <h5 className="my-0 mr-md-auto font-weight-normal">
          ONLINE HOME TEACHING
        </h5>
        <nav className="my-2 my-md-0 mr-md-3 text-white navigation-link">
          <NavLink className="p-2 px-3 text-white rounded bg-primary" to="/">
            Home
          </NavLink>
          <NavLink className="p-2 px-3 text-white rounded" to="/time-table">
            About
          </NavLink>
          <NavLink className="p-2 px-3 text-white rounded" to="/courses">
            Courses
          </NavLink>
          <NavLink className="p-2 px-3 text-white rounded" to="/pricing">
            Pricing
          </NavLink>
          <NavLink className="p-2 px-3 text-white rounded" to="/blogs">
            Blogs
          </NavLink>
          {props.isAuthenticated === false && (
            <NavLink className="p-2 px-3 text-white rounded" to="/login">
              Login
            </NavLink>
          )}
        </nav>
        {props.isAuthenticated === true ? (
          <button
            className="btn btn-light"
            onClick={() => setprofileOpen(true)}
          >
            <MdInsertEmoticon />
          </button>
        ) : (
          <NavLink className="btn btn-outline-light" to="/signup">
            Sign up
          </NavLink>
        )}
      </div>

      {profileOpen === true && (
        <ProfileModal
          user={props.user}
          close={() => setprofileOpen(false)}
          Logout={props.Logout}
        />
      )}
    </>
  );
};

export default Navigation;
