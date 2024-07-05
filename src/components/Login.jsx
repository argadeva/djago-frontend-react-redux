import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/users";
import logo from "../images/logo.png";

export class Login extends Component {
  state = {
    email: "admin1@admin.com",
    password: "admin1"
  };

  onSubmit = e => {
    this.props.dispatch(loginUser(this.state));
    e.preventDefault();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (localStorage.usertoken !== undefined) {
      this.props.history.push("/");
    }
    return (
      <div className="container-fluid p-5 login">
        {this.props.user.isPending ? (
          <div className="loader">
            <div className="inner one" />
            <div className="inner two" />
            <div className="inner three" />
            <span>
              <br />
              <br />
              <br />
              <span className="text-white">Loading...</span>
            </span>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-5 mx-auto">
              <div className="card login-card shadow-lg rounded-0 p-3">
                <div className="text-center">
                  <img
                    src={logo}
                    alt="Menu"
                    className="logo mb-3"
                    style={{ height: 150 }}
                  />
                  <h4 className="font-weight-bolder">Demo POS System</h4>
                </div>
                <div className="card-body">
                  {this.props.user.isRejected ? (
                    <div className="alert alert-danger" role="alert">
                      Invalid login name or password!
                    </div>
                  ) : null}
                  <form onSubmit={e => this.onSubmit(e, this.state)}>
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input
                        defaultValue="admin1@admin.com"
                        type="email"
                        className="form-control reform"
                        name="email"
                        placeholder="Enter Email"
                        required
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Password</label>
                      <input
                        defaultValue="admin1"
                        type="password"
                        className="form-control reform "
                        name="password"
                        placeholder="Enter Password"
                        value={this.state.password}
                        onChange={this.onChange}
                        autoComplete="on"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
                    <p className="mt-3 text-danger text-center">
                      demo : admin1@admin.com / admin1
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStateToProps)(Login);
