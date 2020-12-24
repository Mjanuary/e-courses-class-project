import React, { Component } from "react";
import { v4 as uuid4 } from "uuid";
import Axios from "axios";
import axios from "../../axios-api";
import { Link } from "react-router-dom";
import dataClean from "../../assets/dataClean";
//
class Pricing extends Component {
  state = {
    loading: true,
    user_loading: false,
    payment_loading: false,
    pricings: [],
    loading: true,
    success: null,
    selected: { id: null },
    error_phone: "",
    phone_number: 250,
    response: {
      code: "",
      description: "",
      status: "",
    },
    payment_error: false,
    success: false,
  };

  // data
  componentDidMount = () => {
    axios
      .get("/pricing.json")
      .then((res) => {
        let data = [];
        if (res.data === null) {
          data = [];
        } else {
          data = dataClean(res.data);
        }
        this.setState({
          loading: false,
          // success: true,
          error: null,
          pricings: data,
        });

        console.log({ data });
      })
      .catch((error) => {
        console.log({ error });
        this.setState({
          loading: false,
          // success: null,
          error: true,
        });
      });
  };

  payFunction = () => {
    console.log({ selected: this.state.selected });
    if (this.state.phone_number.length <= 10) {
      return this.setState({
        error_phone: "Invalid phone number",
      });
    }
    //
    let transactionId = uuid4();
    this.setState({
      payment_loading: true,
      user_loading: true,
      payment_error: false,
    });

    Axios.post("https://opay-api.oltranz.com/opay/paymentrequest", {
      telephoneNumber: this.state.phone_number,
      amount: this.state.selected.price,
      organizationId: "5604f5bc-4419-469d-8173-1b54f836c258",
      description: "Payment for Online Courses services",
      callbackUrl:
        "https://react-my-burger-62074.firebaseio.com/payments_list.json",
      transactionId: transactionId,
    })
      .then((res) => {
        console.log({ payment_res: res });

        // update the firebase
        if (+res.data.code !== +200) {
          return this.setState({
            payment_loading: false,
            user_loading: false,
            response: {
              code: res.data.code,
              description: res.data.description,
              status: res.data.status,
            },
            payment_error: true,
          });
        } else {
          // the report data
          let newUser = {
            ...this.props.user,
            payment: {
              ...this.state.selected,
              transactionId: transactionId,
            },
          };
          this.setState({
            payment_loading: false,
          });
          axios
            .put(`/clients/${this.props.user.id}.json`, newUser)
            .then((res_user) => {
              console.log({ user_res: res_user });
              this.setState({
                payment_loading: false,
                user_loading: false,
                success: true,
              });
            })
            .catch((error) => {
              console.log({ error });
              this.setState({
                payment_error: true,
                payment_loading: false,
                user_loading: false,
              });
            });
          console.log({ res, newUser });
        }
      })
      .catch((error) => console.log({ error }));
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

    if (this.state.payment_loading === true) {
      return (
        <div className="p-4 m-4">
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <h6 className="text-center">Loading pricess</h6>
          </div>
        </div>
      );
    }

    if (this.state.user_loading === true) {
      return (
        <div className="p-4 m-4">
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <h6 className="text-center">Loading pricess</h6>
          </div>
        </div>
      );
    }

    return (
      <>
        {this.state.payment_error === true && (
          <div className="container">
            <div className="alert alert-danger text-center">
              {this.state.response.description}
            </div>
          </div>
        )}

        {this.state.success === true && (
          <div className="container">
            <div className="alert alert-success text-center zoomIn animated">
              Please confirm the money on your device and refresh the page
            </div>
          </div>
        )}

        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Pricing</h1>
          <p className="lead">
            Quickly build an effective pricing table for your potential
            customers with this Bootstrap example. It’s built with default
            Bootstrap components and utilities with little customization.
          </p>
          {/* <button className="btn btn-success btn-lg" onClick={this.payFunction}>
            Send payment
          </button> */}
        </div>
        <div className="container">
          <div
            className={`card-deck mb-3 text-center pricing-section-container `}
          >
            {this.state.pricings.map((itm, x) => (
              <div
                className={`card mb-4 shadow bg-white border border-${
                  itm.theme
                } zoomIn animated delay-${x + 3}ms ${
                  itm.id === this.state.selected.id ? "active-card" : ""
                }`}
                key={itm.id}
                onClick={() => {
                  if (itm.id === this.state.selected.id) {
                    return true;
                  }

                  console.log({ itm });
                  this.setState({
                    selected: itm,
                  });
                }}
              >
                <div
                  className={`card-header bg-${itm.theme} text-${itm.color}`}
                >
                  <h4 className="my-0 font-weight-normal">{itm.title}</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    ${itm.price} <small className="text-muted">/ mo</small>
                  </h1>

                  <ul className="list-unstyled mt-3 mb-4">
                    {itm.features?.map((el, i) => (
                      <li kry={i} className="strike">
                        <b>{el.title}</b>{" "}
                        <span
                          className={`badge ${
                            el.types === "Unlimited"
                              ? "bg-success text-white"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {el.types}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {itm.id === this.state.selected.id ? (
                    <div className="border shadow rounded p-2">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <input
                          type="number"
                          value={this.state.phone_number}
                          onChange={(e) => {
                            this.setState({
                              phone_number: e.target.value,
                              error_phone: "",
                            });
                          }}
                          className={`form-control ${
                            this.state.error_phone.length >= 1
                              ? "is-invalid"
                              : ""
                          }`}
                          id="exampleInputEmail1"
                          placeholder="2507000000"
                        />
                        {this.state.error_phone.length >= 1 && (
                          <small className="text-danger">
                            {this.state.error_phone}
                          </small>
                        )}
                      </div>
                      <button
                        type="button"
                        className={`btn btn-block btn-${itm.theme}`}
                        onClick={this.payFunction}
                      >
                        Pay
                      </button>
                    </div>
                  ) : (
                    <div className="text-secondary">Select to pay</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

Pricing.propTypes = {};

export default Pricing;
