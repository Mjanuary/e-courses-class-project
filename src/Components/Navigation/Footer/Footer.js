import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Footer = (props) => {
  return (
    <div className="container">
      <footer className="pt-4 my-md-5 pt-md-5 border-top">
        <div className="row">
          <div className="col-12 col-md">
            {/* <img
              className="mb-2"
              src="/docs/4.5/assets/brand/bootstrap-solid.svg"
              alt
              width={24}
              height={24}
            /> */}
            <small className="d-block mb-3 text-muted">© 2017-2020</small>
          </div>
          <div className="col-6 col-md">
            <h5>Features</h5>
            <ul className="list-unstyled text-small">
              <li>
                <Link className="text-muted" to="/">
                  Cool stuff
                </Link>
              </li>
              <li>
                <Link className="text-muted" to="/">
                  Random feature
                </Link>
              </li>
              <li>
                <Link className="text-muted" to="/">
                  Team feature
                </Link>
              </li>
              <li>
                <Link className="text-muted" to="/">
                  Stuff for developers
                </Link>
              </li>
              <li>
                <Link className="text-muted" to="/">
                  Another one
                </Link>
              </li>
              <li>
                <Link className="text-muted" to="/">
                  Last time
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Resources</h5>
            <ul className="list-unstyled text-small">
              <li>
                <Link className="text-muted" to="/">
                  Resource
                </Link>
              </li>
              <li>
                <Link className="text-muted" to="/">
                  Resource name
                </Link>
              </li>
              <li>
                <Link className="text-muted" to="/">
                  Another resource
                </Link>
              </li>
              <li>
                <Link className="text-muted" to="/">
                  Final resource
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>About</h5>
            <ul className="list-unstyled text-small">
              <li>
                <Link className="text-muted" to="/">
                  Team
                </Link>
              </li>
              <li>
                <Link className="text-muted" to="/">
                  Locations
                </Link>
              </li>
              <li>
                <Link className="text-muted" to="/">
                  Privacy
                </Link>
              </li>
              <li>
                <Link className="text-muted" to="/">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
