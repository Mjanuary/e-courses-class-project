import React from "react";
// import PropTypes from 'prop-types'
import { MdAccountCircle } from "react-icons/md";
import BackDrop from "../BackDrop/BackDrop";
const ProfileModal = ({ close, user, Logout }) => {
  if (user === null || user === undefined) {
    return null;
  }
  return (
    <>
      <BackDrop close={close} />
      <div className="fixed-position-contents-div zoomIn faster animated profile-popup bg-white rounded">
        <div className="p-4 bg-primary rounded">
          <br />
          <br />
        </div>
        <div className="mt-n4 text-center">
          <MdAccountCircle className="text-primary display-1 big-font text-center" />
        </div>
        <div className="text-center">
          <button className="btn btn-danger" onClick={Logout}>
            Logout
          </button>
        </div>
        <div className="p-4 mx-4">
          <table className="table">
            <tr>
              <td className="text-secondary">names</td>
              <td className="font-weight-bold">
                <b>{user.names}</b>
              </td>
            </tr>
            <tr>
              <td className="text-secondary">username</td>
              <td className="font-weight-bold">
                <b>{user.username}</b>
              </td>
            </tr>
            <tr>
              <td className="text-secondary">email</td>
              <td className="font-weight-bold">
                <b>{user.email}</b>
              </td>
            </tr>
            <tr>
              <td className="text-secondary">gender</td>
              <td className="font-weight-bold">
                <b>{user.gender}</b>
              </td>
            </tr>
            <tr>
              <td className="text-secondary">dob</td>
              <td className="font-weight-bold">
                <b>{user.dob}</b>
              </td>
            </tr>
            <tr>
              <td className="text-secondary">account created date</td>
              <td className="font-weight-bold">
                <b>{user.created_date}</b>
              </td>
            </tr>
          </table>
        </div>

        {/* <h1 className="m-0">This is the contents</h1> */}
      </div>
    </>
  );
};

ProfileModal.propTypes = {};

export default ProfileModal;
