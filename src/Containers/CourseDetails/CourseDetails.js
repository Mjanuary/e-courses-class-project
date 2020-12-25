import React, { Component } from "react";
import axios from "../../axios-api";
import { STRING_SLICE, DATE } from "../../assets/tools";
import { MdPerson } from "react-icons/md";
class CourseDetails extends Component {
  state = {
    loading: true,
    data: null,
    loading: true,
    success: null,
  };

  componentDidMount = () => {
    this.setState({
      loading: true,
      success: null,
    });
    axios
      .get(`/video_courses/${this.props.match.params.course_id}.json`)
      .then((res) => {
        console.log({ res });

        this.setState({
          loading: false,
          success: true,
          error: null,
          data: res.data,
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
        <div className="bg-dark mt-n4 p-2">
          <iframe
            width={"100%"}
            height={"700px"}
            src={`https://www.youtube.com/embed/${data.video}`}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="this is awesome"
          />
        </div>
        <div className="container">
          <h2 className="m-0 mt-4 mb-3 font-weight-bold text-primary">
            {data.title}
          </h2>

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
            <p className="mt-3 pt-4 w-75">{data.description}</p>
          </div>
        </div>
      </>
    );
  }
}

export default CourseDetails;
