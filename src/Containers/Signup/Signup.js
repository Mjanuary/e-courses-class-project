import React, { Component } from "react";
// import PropTypes from "prop-types";
import axios from "../../axios-api";
import SuccessImage from "../../Images/success-image.jpg";
import ErrorImages from "../../Images/error-image.jpg";
import RegisterImage from "../../Images/register-image.jpg";
import { Link } from "react-router-dom";
class Signup extends Component {
  state = {
    error: {
      target: null,
      msg: "",
    },
    names: "",
    email: "",
    password: "",
    dob: "",
    address: "",
    gender: "",
    username: "",
    re_password: "",
    loading: false,
    success: null,
    failed: null,
  };

  inputChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
      error: {
        target: null,
        msg: "",
      },
    });

  componentDidMount = () => {
    if (this.props.isAuthenticated === true) {
      this.props.history.push("/courses");
    }
  };

  SubmitData = (e) => {
    e.preventDefault();

    // form validation
    // email
    if (this.state.email.length <= 0) {
      return this.setState({
        error: {
          target: "email",
          msg: "Email is required.",
        },
      });
    }

    // username
    if (this.state.username.length <= 0) {
      return this.setState({
        error: {
          target: "username",
          msg: "Username is required.",
        },
      });
    }

    // names
    if (this.state.names.length <= 0) {
      return this.setState({
        error: {
          target: "names",
          msg: "Your names are required.",
        },
      });
    }

    // gender
    if (this.state.gender.length <= 0) {
      return this.setState({
        error: {
          target: "gender",
          msg: "Gender is required.",
        },
      });
    }

    // gender
    if (this.state.dob.length <= 0) {
      return this.setState({
        error: {
          target: "dob",
          msg: "date of birth is required.",
        },
      });
    }

    // gender
    if (this.state.password.length <= 6) {
      return this.setState({
        error: {
          target: "password",
          msg: "password must be above 7 characters.",
        },
      });
    }

    // gender
    if (this.state.password !== this.state.re_password) {
      return this.setState({
        error: {
          target: "re_password",
          msg: "Your password does not match.",
        },
      });
    }

    // send the data into the database
    // console.log("Submitted the data");
    this.setState({
      loading: true,
      success: null,
      error: { target: null, msg: "" },
    });
    axios
      .post("/clients.json", {
        username: this.state.username,
        email: this.state.email,
        names: this.state.names,
        password: this.state.password,
        gender: this.state.gender,
        dob: this.state.dob,
        created_date: new Date(),
        admin: false,
        payment: null,
      })
      .then((res) => {
        // console.log({ res });
        this.setState({
          loading: false,
          success: true,
          error: null,
        });
      })
      .catch((error) => {
        console.log({ error });
        this.setState({
          loading: false,
          success: null,
          error: true,
        });
      });
  };

  // render the data
  render() {
    if (this.state.success === true) {
      return (
        <div className="container text-center bg-white p-4 rounded">
          <div className="zoomIn animated p-4">
            <img src={SuccessImage} className="w-50" alt="Success login" />
            <h3 className="text-success">
              Your acount has been created successfuly
            </h3>
            <p>now you can login and start to learn</p>

            <div className="mt-2">
              <Link to="/login" className="btn btn-lg btn-outline-success">
                Login
              </Link>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.failed === true) {
      return (
        <div className="container text-center bg-white p-4 rounded">
          <div className="zoomIn animated p-4">
            <img src={ErrorImages} className="w-50" alt="error login" />
            <h3 className="text-danger">Failed to create an account</h3>
            <p>nPlease try again later</p>

            <div className="mt-2">
              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  this.setState({
                    success: null,
                    failed: null,
                    loading: false,
                  })
                }
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row mx-0">
          <div className="col-md-12 col-lg-6">
            <img src={RegisterImage} className="w-100" alt="register" />
            <h1 className="mt-2 text-center text-primary">
              All you need is an account
            </h1>
            <p className="text-center">
              Create an account and <br /> access more than 50000+ courses.
            </p>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="p-4 ">
              <h1 className="text-primary text-center font-weight-bold border-bottom pb-2">
                Sign up
              </h1>
              <form onSubmit={this.SubmitData}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className={`form-control ${
                      this.state.error?.target === "email" ? "is-invalid" : ""
                    }`}
                    id="email"
                    value={this.state.email}
                    onChange={this.inputChange}
                    disabled={this.state.loading}
                    name="email"
                  />
                  {this.state.error.target === "email" && (
                    <small id="emailHelp" className="form-text text-danger ">
                      {this.state.error.msg}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className={`form-control ${
                      this.state.error.target === "username" ? "is-invalid" : ""
                    }`}
                    id="username"
                    value={this.state.username}
                    onChange={this.inputChange}
                    disabled={this.state.loading}
                    name="username"
                  />
                  {this.state.error.target === "username" && (
                    <small id="emailHelp" className="form-text text-danger ">
                      {this.state.error.msg}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="names">Names</label>
                  <input
                    type="text"
                    className={`form-control ${
                      this.state.error.target === "names" ? "is-invalid" : ""
                    }`}
                    id="names"
                    value={this.state.names}
                    onChange={this.inputChange}
                    disabled={this.state.loading}
                    name="names"
                  />
                  {this.state.error.target === "names" && (
                    <small id="emailHelp" className="form-text text-danger ">
                      {this.state.error.msg}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="gender">gender</label>
                  <select
                    className={`form-control ${
                      this.state.error.target === "gender" ? "is-invalid" : ""
                    }`}
                    id="gender"
                    value={this.state.gender}
                    onChange={this.inputChange}
                    disabled={this.state.loading}
                    name="gender"
                  >
                    <option></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {this.state.error.target === "gender" && (
                    <small id="emailHelp" className="form-text text-danger ">
                      {this.state.error.msg}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="dob">Date of birth</label>
                  <input
                    type="date"
                    className={`form-control ${
                      this.state.error.target === "dob" ? "is-invalid" : ""
                    }`}
                    id="dob"
                    value={this.state.dob}
                    onChange={this.inputChange}
                    disabled={this.state.loading}
                    name="dob"
                  />
                  {this.state.error.target === "dob" && (
                    <small id="emailHelp" className="form-text text-danger ">
                      {this.state.error.msg}
                    </small>
                  )}
                </div>

                <div className="p-3 shadow-sm border">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className={`form-control ${
                        this.state.error.target === "password"
                          ? "is-invalid"
                          : ""
                      }`}
                      id="password"
                      value={this.state.password}
                      onChange={this.inputChange}
                      disabled={this.state.loading}
                      name="password"
                    />
                    {this.state.error.target === "password" && (
                      <small id="emailHelp" className="form-text text-danger ">
                        {this.state.error.msg}
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="re_password">Re-enter password</label>
                    <input
                      type="password"
                      className={`form-control ${
                        this.state.error.target === "re_password"
                          ? "is-invalid"
                          : ""
                      }`}
                      id="re_password"
                      value={this.state.re_password}
                      onChange={this.inputChange}
                      disabled={this.state.loading}
                      name="re_password"
                    />
                    {this.state.error.target === "re_password" && (
                      <small id="emailHelp" className="form-text text-danger ">
                        {this.state.error.msg}
                      </small>
                    )}
                  </div>
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-success btl-lg btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading === true ? (
                    <span className="fadeIn animated infinite">Loading...</span>
                  ) : (
                    "Create an account"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {};

export default Signup;
