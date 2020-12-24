import React, { Component } from "react";
// import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import axios from "../../axios-api";
import dataClean from "../../assets/dataClean";
import { STRING_SLICE, DATE } from "../../assets/tools";
//
export class Courses extends Component {
  state = {
    loading: true,
    all_courses: [],
    loading: true,
    success: null,
  };

  componentDidMount = () => {
    this.setState({
      loading: true,
      success: null,
    });
    axios
      .get("/video_courses.json")
      .then((res) => {
        console.log({ res });
        let data = [];
        if (res.data === null) {
          data = [];
        } else {
          data = dataClean(res.data);
        }
        console.log({ data });
        this.setState({
          loading: false,
          success: true,
          error: null,
          all_courses: data,
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

  render() {
    if (this.state.loading === true) {
      return (
        <div className="p-4 m-4">
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    }
    return (
      <>
        <div>
          <section className="jumbotron mt-n3 text-center">
            <div className="container">
              <h1 className="m-0 display-3">Courses videos</h1>
            </div>
          </section>
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row">
                {this.state.all_courses.map((itm, i) => (
                  <div className="col-md-4" key={i}>
                    <div className="card mb-4 shadow-sm">
                      <div
                        className="bd-placeholder-img card-img-top image-card-course"
                        style={{ backgroundImage: `url("${itm.thumbnail}")` }}
                      />

                      <div className="card-body">
                        <h3 className="m-0 mb-1">
                          {STRING_SLICE(itm.title, 13)}
                        </h3>
                        <section className="py-2">
                          <span className="badge bg-warning">
                            {itm.plan_type}
                          </span>{" "}
                          <span className="badge bg-success text-white">
                            {itm.category}
                          </span>
                        </section>
                        <p className="card-text">
                          {STRING_SLICE(itm.description, 90)}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <Link to={`/course-details/${itm.id}`}>
                              <button
                                type="button"
                                className="btn  btn-primary"
                              >
                                Open course
                              </button>
                            </Link>
                          </div>
                          <small className="text-muted">{DATE(itm.date)}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Courses;
