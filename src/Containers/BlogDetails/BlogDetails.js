import React, { Component } from "react";
import axios from "../../axios-api";
import { STRING_SLICE, DATE } from "../../assets/tools";
import { MdPerson } from "react-icons/md";
import dataClean from "../../assets/dataClean";
import { Link } from "react-router-dom";

//
class CourseDetails extends Component {
  state = {
    loading: true,
    data: null,
    loading: true,
    success: null,
    blogs: [],
  };

  componentDidMount = () => {
    this.setState({
      loading: true,
      success: null,
    });
    axios
      .get(`/blog_courses.json`)
      .then((res) => {
        console.log({ res });
        let data = [];
        let details = null;
        if (res.data === null) {
          data = [];
        } else {
          data = dataClean(res.data);
          details = dataClean(res.data).find(
            (itm) => itm.id === this.props.match.params.course_id
          );
        }
        this.setState({
          loading: false,
          success: true,
          error: null,
          data: details === undefined ? null : details,
          blogs: data,
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

    let data = this.state.data;
    return (
      <>
        <div className="container-lg">
          <img className="img w-100" alt="section lg" src={data.thumbnail} />
          <h2 className="m-0 mt-4 mb-3 font-weight-bold text-primary">
            {data.title}
          </h2>

          <div className="row mx-0">
            <div className="col">
              <div className="">
                <span className="badge bg-primary text-white">
                  <h4 className="m-0 p-2 d-inline-block">{data.plan_type}</h4>
                </span>{" "}
                <span className="badge  bg-warning">
                  <h4 className="m-0 p-2  d-inline-block">{data.category}</h4>
                </span>
                <div className="w-50 pt-3 pb-2">
                  <h4 className="m-0 mb-2">
                    <i className="m-0 front-weight-light text-secondary">
                      <MdPerson /> Teacher:{" "}
                    </i>
                    <b>{data.teacher}</b>
                  </h4>
                  <h4 className="m-0 mb-2">
                    <i className="m-0 front-weight-light text-secondary">
                      <MdPerson /> Date:{" "}
                    </i>
                    <b>{data.date}</b>
                  </h4>
                </div>
                <section
                  className="blog-details-html"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
                {/* <p className="mt-3 pt-4 w-75">{data.description}</p> */}
              </div>
            </div>
            <div className=" col-lg-4 col-md-4 col-sm-12">
              <h4 className="m-0">Blogs</h4>
              {this.state.blogs
                .filter((el) => el.plan_type === data.plan_type)
                .map((itm) => (
                  <div className="row pt-2 p-2 mx-0 mb-3 shadow">
                    <div className="col-5 p-0">
                      <img
                        src={itm.thumbnail}
                        alt="details"
                        className="w-100 img-thumbnail"
                      />
                    </div>
                    <div className="col">
                      <h5
                        //   className="text-primary"
                        onClick={() => {
                          if (itm.id === data.id) {
                            return true;
                          }
                          this.setState({ data: itm });
                        }}
                      >
                        <Link
                          to={`/blog-details/${itm.id}`}
                          className="text-primary"
                        >
                          {itm.title}
                        </Link>
                      </h5>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CourseDetails;
