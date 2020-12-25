import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdInsertEmoticon } from "react-icons/md";
import ProfileModal from "../ProfileModal/ProfileModal";
const Navigation = (props) => {
  const [profileOpen, setprofileOpen] = useState(false);
  const [warning, setwarning] = useState(true);
  return (
    <>
    {props.isAuthenticated === true && props.user?.admin === false && warning === true && <div className="bg-warning">
      <div onClick={() => setwarning(false)} className="text-center p-3">You are free to enjoy all the contents for <b>10 days</b> <br/> after you will need to pay in order to contimue to view the contents.</div>
    </div>}
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-primary text-white border-bottom shadow-sm">
        <h5 className="my-0 mr-md-auto font-weight-normal">
          ONLINE HOME TEACHING
        </h5>
        <nav className="my-2 my-md-0 mr-md-3 text-white navigation-link">
          <NavLink className="p-2 px-3 text-white rounded bg-primary" to="/">
            Home
          </NavLink>
          {props.isAuthenticated === true && (
            <>
              <NavLink className="p-2 px-3 text-white rounded" to="/time-table">
                Live courses
              </NavLink>
              <NavLink className="p-2 px-3 text-white rounded" to="/courses">
                Video Courses
              </NavLink>
              <NavLink className="p-2 px-3 text-white rounded" to="/blogs">
                Blogs
              </NavLink>

              <NavLink className="p-2 px-3 text-white rounded" to="/pricing">
                Pricing
              </NavLink>
            </>
          )}

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
