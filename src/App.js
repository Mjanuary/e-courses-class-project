import { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// styles
import "./styles/animate.css";
import "./styles/bootstrap.min.css";
import "./styles/main.css";
// components
import Navigation from "./Components/Navigation/Navigation";
import Footer from "./Components/Navigation/Footer/Footer";
// containers
import Homepage from "./Containers/Homepage/Homepage";
import About from "./Containers/About/About";
import NotFound from "./Containers/NotFound/NotFound";
import Pricing from "./Containers/Pricing/Pricing";
import PricingDetails from "./Containers/PricingDetails/PricingDetails";
import Courses from "./Containers/Courses/Courses";
import Blogs from "./Containers/Blogs/Blogs";
import Login from "./Containers/Login/Login";
import CourseDetails from "./Containers/CourseDetails/CourseDetails";
import BlogDetails from "./Containers/BlogDetails/BlogDetails";
import Signup from "./Containers/Signup/Signup";
import SideNavigation from "./Components/SideNavidation/SideNavigation";
// admin
import CreateVideoCourse from "./Containers/CreateVideoCourse/CreateVideoCourse";
import CreateBlogCourse from "./Containers/CreateBlogCourse/CreateBlogCourse";
import CreateEvent from "./Containers/CreateEvent/CreateEvent";
import TimeTable from "./Containers/TimeTable/TimeTable";
//
function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isPayed, setisPayed] = useState(null);
  const [loading, seLoading] = useState(false);

  useEffect(() => {
    let user_account = localStorage.getItem("user_account");

    // setisPayed
    if (user_account === null) {
      setisAuthenticated(false);
      setUser(null);
    } else {
      setisAuthenticated(true);
      setUser(JSON.parse(user_account));
    }
  }, []);

  const LoginUser = (user) => {
    setUser(user);
    localStorage.setItem("user_account", JSON.stringify(user));
    setisAuthenticated(true);
  };

  const LogoutUser = () => {
    setisAuthenticated(false);
    localStorage.removeItem("user_account");
    setUser(null);
  };

  return (
    <Fragment>
      <Router>
        <Navigation
          user={user}
          isAuthenticated={isAuthenticated}
          isPayed={isPayed}
          Logout={LogoutUser}
        />
        {user !== null && isAuthenticated === true && user.admin === true && (
          <SideNavigation />
        )}
        <Switch>
          <Route exact path="/about" component={About} />

          {/* CreateEvent */}
          <Route
            exact
            path="/create-event"
            render={(props) => (
              <CreateEvent
                {...props}
                user={user}
                isAuthenticated={isAuthenticated}
                isPayed={isPayed}
              />
            )}
          />

          {/* CreateVideoCourse */}
          <Route
            exact
            path="/create-video-course"
            render={(props) => (
              <CreateVideoCourse
                {...props}
                user={user}
                isAuthenticated={isAuthenticated}
                isPayed={isPayed}
              />
            )}
          />

          {/* CreateVideoCourse */}
          <Route
            exact
            path="/create-blog-course"
            render={(props) => (
              <CreateBlogCourse
                {...props}
                user={user}
                isAuthenticated={isAuthenticated}
                isPayed={isPayed}
              />
            )}
          />

          {/* Pricing */}
          <Route
            exact
            path="/pricing"
            render={(props) => (
              <Pricing
                {...props}
                user={user}
                isAuthenticated={isAuthenticated}
                isPayed={isPayed}
                LoginUser={LoginUser}
              />
            )}
          />

          {/* PricingDetails */}
          <Route
            exact
            path="/pricing-details/:pricingId"
            render={(props) => (
              <PricingDetails
                {...props}
                user={user}
                isAuthenticated={isAuthenticated}
                isPayed={isPayed}
              />
            )}
          />

          {/* Courses */}
          <Route
            exact
            path="/courses"
            render={(props) => (
              <Courses
                {...props}
                user={user}
                isAuthenticated={isAuthenticated}
                isPayed={isPayed}
              />
            )}
          />

          {/* Courses */}
          <Route
            exact
            path="/blogs"
            render={(props) => (
              <Blogs
                {...props}
                user={user}
                isAuthenticated={isAuthenticated}
                isPayed={isPayed}
              />
            )}
          />

          {/* Login */}
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login
                {...props}
                Login={LoginUser}
                user={user}
                isAuthenticated={isAuthenticated}
                isPayed={isPayed}
              />
            )}
          />

          {/* signup */}
          <Route
            exact
            path="/signup"
            render={(props) => (
              <Signup
                {...props}
                user={user}
                isAuthenticated={isAuthenticated}
                isPayed={isPayed}
              />
            )}
          />

          {/* CourseDetails */}
          <Route
            exact
            path="/course-details/:course_id"
            render={(props) => (
              <CourseDetails
                {...props}
                user={user}
                isAuthenticated={isAuthenticated}
                isPayed={isPayed}
              />
            )}
          />

          {/* CourseDetails */}
          <Route
            exact
            path="/blog-details/:course_id"
            render={(props) => (
              <BlogDetails
                {...props}
                user={user}
                isAuthenticated={isAuthenticated}
                isPayed={isPayed}
              />
            )}
          />

          {/* CourseDetails */}
          <Route
            exact
            path="/time-table"
            render={(props) => (
              <TimeTable
                {...props}
                user={user}
                isAuthenticated={isAuthenticated}
                isPayed={isPayed}
              />
            )}
          />

          <Route exact path="/" component={Homepage} />

          <Route component={NotFound} />
        </Switch>
        <Footer
          user={user}
          isAuthenticated={isAuthenticated}
          isPayed={isPayed}
        />
      </Router>
    </Fragment>
  );
}

export default App;
