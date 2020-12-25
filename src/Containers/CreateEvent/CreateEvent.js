import React, { Component } from "react";
// import PropTypes from "prop-types";
import axios from "../../axios-api";
import SuccessImage from "../../Images/success-image.jpg";
import ErrorImages from "../../Images/error-image.jpg";
import RegisterImage from "../../Images/register-image.jpg";
import { Link } from "react-router-dom";
import { course_categories } from "../../assets/data";
//
class CreateVideoCourse extends Component {
  state = {
    error: {
      target: null,
      msg: "",
    },
    title: "",
    thumbnail: "",
    video: "",
    plan_type: "",
    category: "",
    limited: true,
    description: "",
    teacher: "",
    date: "",

    loading: false,
    success: null,
    failed: null,
    add_file: false,
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
      if (this.props.user.admin === false) {
        this.props.history.push("/courses");
      }
    } else {
      this.props.history.push("/login");
    }
  };

  SubmitData = (e) => {
    e.preventDefault();
    // form validation

    // date
    if (this.state.date.length <= 0) {
      return this.setState({
        error: {
          target: "date",
          msg: "the date is required.",
        },
      });
    }

    // title
    if (this.state.title.length <= 0) {
      return this.setState({
        error: {
          target: "title",
          msg: "Your title are required.",
        },
      });
    }
    // thumbnail
    if (this.state.thumbnail.length <= 0) {
      return this.setState({
        error: {
          target: "thumbnail",
          msg: "thumbnail is required.",
        },
      });
    }

    // plan_type
    if (this.state.plan_type.length <= 0) {
      return this.setState({
        error: {
          target: "plan_type",
          msg: "plan_type is required.",
        },
      });
    }

    // plan_type
    if (this.state.category.length <= 0) {
      return this.setState({
        error: {
          target: "category",
          msg: "date of birth is required.",
        },
      });
    }

    // limited
    if (this.state.limited.length <= 0) {
      return this.setState({
        error: {
          target: "limited",
          msg: "limited is required.",
        },
      });
    }

    // description
    if (this.state.description.length <= 0) {
      return this.setState({
        error: {
          target: "description",
          msg: "Your description does not match.",
        },
      });
    }

    // // Teacher
    // if (this.state.Teacher.length <= 0) {
    //   return this.setState({
    //     error: {
    //       target: "Teacher",
    //       msg: "Your Teacher does not match.",
    //     },
    //   });
    // }

    // send the data into the database
    this.setState({
      loading: true,
      success: null,
      error: { target: null, msg: "" },
    });
    axios
      .post("/events.json", {
        title: this.state.title,
        thumbnail: this.state.thumbnail,
        plan_type: this.state.plan_type,
        category: this.state.category,
        limited: this.state.limited,
        description: this.state.description,
        teacher:
          this.state.teacher.length <= 0
            ? this.props.user.names
            : this.state.teacher,
        date: new Date(this.state.date),
        status: true,
      })
      .then((res) => {
        console.log({ res });
        this.setState({
          loading: false,
          success: true,
          error: null,
          created_file_id: res.data,
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

  addFile = (data) => {
    console.log({ data });
    this.setState({
      files: [data, ...this.state.files],
      add_file: false,
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
              The course has been created successfuly
            </h3>
            <p>your course has been published</p>

            <div className="mt-2">
              <Link to="/" className="btn btn-lg btn-outline-success">
                open course details
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
                Create an event
              </h1>
              <form onSubmit={this.SubmitData}>
                {/* teacher */}
                <div className="form-group">
                  <label htmlFor="date">date</label>
                  <input
                    type="date"
                    className={`form-control ${
                      this.state.error.target === "date" ? "is-invalid" : ""
                    }`}
                    id="date"
                    value={this.state.date}
                    onChange={this.inputChange}
                    disabled={this.state.loading}
                    name="date"
                  />
                  {this.state.error.target === "date" && (
                    <small
                      id="thumbnailHelp"
                      className="form-text text-danger "
                    >
                      {this.state.error.msg}
                    </small>
                  )}
                </div>
                {/* title */}
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className={`form-control ${
                      this.state.error.target === "title" ? "is-invalid" : ""
                    }`}
                    id="title"
                    value={this.state.title}
                    onChange={this.inputChange}
                    disabled={this.state.loading}
                    name="title"
                  />
                  {this.state.error.target === "title" && (
                    <small
                      id="thumbnailHelp"
                      className="form-text text-danger "
                    >
                      {this.state.error.msg}
                    </small>
                  )}
                </div>

                {/* thumbnail */}
                <div className="form-group">
                  <label htmlFor="thumbnail">thumbnail</label>
                  <input
                    type="text"
                    className={`form-control ${
                      this.state.error?.target === "thumbnail"
                        ? "is-invalid"
                        : ""
                    }`}
                    id="thumbnail"
                    value={this.state.thumbnail}
                    onChange={this.inputChange}
                    disabled={this.state.loading}
                    name="thumbnail"
                  />
                  {this.state.error.target === "thumbnail" && (
                    <small
                      id="thumbnailHelp"
                      className="form-text text-danger "
                    >
                      {this.state.error.msg}
                    </small>
                  )}
                </div>

                {/* plan_type */}
                <div className="form-group">
                  <label htmlFor="plan_type">Plan type</label>
                  <select
                    className={`form-control ${
                      this.state.error.target === "plan_type"
                        ? "is-invalid"
                        : ""
                    }`}
                    id="plan_type"
                    value={this.state.plan_type}
                    onChange={this.inputChange}
                    disabled={this.state.loading}
                    name="plan_type"
                  >
                    <option></option>
                    <option value="Student">Student</option>
                    <option value="Premium">Premium</option>
                    <option value="Profession">Profession</option>
                  </select>
                  {this.state.error.target === "plan_type" && (
                    <small
                      id="thumbnailHelp"
                      className="form-text text-danger "
                    >
                      {this.state.error.msg}
                    </small>
                  )}
                </div>

                {/* categories */}
                <div className="form-group">
                  <label htmlFor="category">Categories</label>
                  <select
                    type="date"
                    className={`form-control ${
                      this.state.error.target === "category" ? "is-invalid" : ""
                    }`}
                    id="category"
                    value={this.state.category}
                    onChange={this.inputChange}
                    disabled={this.state.loading}
                    name="category"
                  >
                    <option></option>
                    {course_categories.map((itm, i) => (
                      <option value={itm} key={i}>
                        {itm}
                      </option>
                    ))}
                  </select>
                  {this.state.error.target === "category" && (
                    <small
                      id="thumbnailHelp"
                      className="form-text text-danger "
                    >
                      {this.state.error.msg}
                    </small>
                  )}
                </div>

                {/* limited */}
                <div className="form-group">
                  <label htmlFor="limited">limited</label>
                  <select
                    type="text"
                    className={`form-control ${
                      this.state.error.target === "limited" ? "is-invalid" : ""
                    }`}
                    id="limited"
                    value={this.state.limited}
                    onChange={this.inputChange}
                    disabled={this.state.loading}
                    name="limited"
                  >
                    <option value=""></option>
                    <option value={true}>Unlimited</option>
                    <option value={false}>Limited</option>
                  </select>
                  {this.state.error.target === "limited" && (
                    <small
                      id="thumbnailHelp"
                      className="form-text text-danger "
                    >
                      {this.state.error.msg}
                    </small>
                  )}
                </div>

                {/* description */}
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    Description
                  </label>
                  <textarea
                    className={`form-control ${
                      this.state.error.target === "description"
                        ? "is-invalid"
                        : ""
                    }`}
                    id="description"
                    value={this.state.description}
                    onChange={this.inputChange}
                    disabled={this.state.loading}
                    name="description"
                    rows={3}
                  />
                </div>

                {/* teacher */}
                <div className="form-group">
                  <label htmlFor="teacher">Teacher</label>
                  <input
                    type="text"
                    className={`form-control ${
                      this.state.error.target === "teacher" ? "is-invalid" : ""
                    }`}
                    id="teacher"
                    value={this.state.teacher}
                    onChange={this.inputChange}
                    disabled={this.state.loading}
                    name="teacher"
                  />
                  {this.state.error.target === "teacher" && (
                    <small
                      id="thumbnailHelp"
                      className="form-text text-danger "
                    >
                      {this.state.error.msg}
                    </small>
                  )}
                </div>
                <br />
                <br />
                <button
                  className="btn btn-success btn-lg btl-lg btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading === true ? (
                    <span className="fadeIn animated infinite">Loading...</span>
                  ) : (
                    "Create & Publish course"
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

CreateVideoCourse.propTypes = {};

export default CreateVideoCourse;
