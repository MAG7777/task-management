import React, { PureComponent } from "react";
import "./public/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ToDo from "./components/pages/ToDo";
import SingleTask from "./components/pages/SingleTask/SingleTask";
import NotFound from "./components/pages/NotFound";
import Spinner from "./components/Spinner/Spinner";
import Register from "./components/pages/Resgister/Register";
import Login from "./components/pages/Login/Login";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBarMenu from "./components/NavBarMenu";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";

class App extends PureComponent {
  componentDidUpdate() {
    const { errorMessage, successMessage, authErrorMessage, authSuccessMessage } = this.props;
    if (errorMessage) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
    }
    if (authErrorMessage) {
      toast.error(authErrorMessage);
    }
    if (authSuccessMessage) {
      toast.success(authSuccessMessage);
    }
  }

  render() {
    const { showSpinner, showAuthSpiner } = this.props;
    return (
      <>
        <div className="app">
          <NavBarMenu />
          <Switch>
            <Route exact path="/" component={ToDo} />
            <Route exact path="/task/:id" component={SingleTask} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>

          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
        {(showSpinner || showAuthSpiner) && <Spinner />}
      </>
    );
  }
}

const mapeStateToProps = (state) => {
  return {
    errorMessage: state.taskReducer.error,
    successMessage: state.taskReducer.successMessage,
    showSpinner: state.taskReducer.loading,

    showAuthSpiner: state.authReducer.loading,
    authErrorMessage: state.authReducer.error,
    authSuccessMessage: state.authReducer.successMessage,
  };
};

export default connect(mapeStateToProps)(App);
