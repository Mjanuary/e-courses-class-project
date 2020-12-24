import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import axios from "../../axios-api";
import dataClean from "../../assets/dataClean";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");

  useEffect(() => {
    if (props.isAuthenticated === true) {
      props.history.push("/courses");
    }
  }, []);

  const Submit = (e) => {
    e.preventDefault();
    setError("");
    if (email.length <= 0 || password.length <= 0) {
      return setError("all fields are required!");
    }
    setLoading(true);
    console.log("email submitted");
    axios
      .get("/clients.json")
      .then((res) => {
        let data = dataClean(res.data);
        setLoading(false);

        // check whether the user exists
        let existsUser = data.find(
          (itm) => itm.email === email && itm.password === password
        );
        if (existsUser === undefined) {
          return setError("Username or password are incorect");
        } else {
          let user = { ...existsUser };
          delete user.password;
          console.log("user is available");
          console.log(user);
          props.Login(user);
          props.history.push("/courses");
        }
      })
      .catch((error) => {
        console.log({ error });
        return setError("Failed to log you in, try again later");
      });
  };
  return (
    <>
      <div className="p-4 text-center m-4">
        <form className="form-signin" onSubmit={Submit}>
          {/* <img
            className="mb-4"
            src="/docs/4.5/assets/brand/bootstrap-solid.svg"
            alt
            width={72}
            height={72}
          /> */}
          <h1 className="h3 mb-3 font-weight-bold text-primary">sign in</h1>
          {Error.length >= 1 && (
            <div className="alert alert-danger text-danger bounceIn animated">
              {Error}
            </div>
          )}
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
            disabled={loading}
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultValue="remember-me" disabled />{" "}
              Remember me
            </label>
          </div>
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={loading}
          >
            {loading === true ? (
              <span className="fadeIn animated infinite">Loading...</span>
            ) : (
              "Sign in"
            )}
          </button>
          <p className="mt-5 mb-3 text-muted">© 2017-2020</p>
        </form>
      </div>
    </>
  );
};

Login.propTypes = {};

export default Login;
