import React, { Component } from "react";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import {
  getUsers,
  addUsers,
  editUsers,
  deleteUsers
} from "../redux/actions/users";
import edit from "../images/edit.png";
import remove from "../images/delete.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class Users extends Component {
  state = {
    userData: [],
    editData: {
      id: null,
      name: "",
      email: "",
      password: ""
    }
  };

  getUsers = async () => {
    await this.props.dispatch(getUsers());
    this.setState({
      userData: this.props.user.userData.result
    });
  };

  handleAdd = () => {
    this.setState({
      editData: {
        id: null,
        name: "",
        email: "",
        password: ""
      }
    });
  };

  handleUpdate = data => {
    this.setState({
      editData: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: ""
      }
    });
  };

  handleFormChange = e => {
    const editDatas = this.state.editData;
    editDatas[e.target.name] = e.target.value;
    this.setState({
      editDatas
    });
  };

  handleRemove = id => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        this.props.dispatch(deleteUsers(id)).then(() => {
          MySwal.fire({
            title: "Deleted!",
            text: "Your file has been deleted!",
            icon: "success"
          });
          const index = this.state.userData.findIndex(function(onData) {
            return onData.id === id;
          });
          let array = [...this.state.userData];
          array.splice(index, 1);
          this.setState({ userData: array });
        });
      }
    });
  };

  handleSubmit = async e => {
    const formValidationName = data => {
      // eslint-disable-next-line
      let Regex = /^[a-zA-Z][a-zA-Z ]*$/;
      return Regex.test(data);
    };

    const formValidationEmail = data => {
      // eslint-disable-next-line
      let Regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      return Regex.test(data);
    };

    const formValidationPass = data => {
      // eslint-disable-next-line
      let Regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return Regex.test(data);
    };

    if (!formValidationName(this.state.editData.name)) {
      MySwal.fire({
        title: "Oops...",
        text: "Name must be only word and space!",
        icon: "error"
      });
    } else if (!formValidationEmail(this.state.editData.email)) {
      MySwal.fire({
        title: "Oops...",
        text: "Email not valid!",
        icon: "error"
      });
    } else if (!formValidationPass(this.state.editData.password)) {
      MySwal.fire({
        title: "Oops...",
        text: "Minimum 8 characters, at least 1 letter and 1 number!",
        icon: "error"
      });
    } else {
      e.preventDefault();
      if (this.state.editData.id !== null) {
        this.props.dispatch(editUsers(this.state.editData)).then(() => {
          MySwal.fire({
            title: "Good Job!",
            text: "Edit Users Success!",
            icon: "success"
          });
          let id = this.state.editData.id;
          const index = this.state.userData.findIndex(function(onData) {
            return onData.id === id;
          });
          let datas = [...this.state.userData];
          let data = { ...datas[index] };
          data.name = this.state.editData.name;
          data.email = this.state.editData.email;
          datas[index] = data;
          this.setState({ userData: datas });
        });
      } else {
        this.props.dispatch(addUsers(this.state.editData)).then(() => {
          MySwal.fire({
            title: "Good Job!",
            text: "Add Users Success!",
            icon: "success"
          });
          let newData = {
            id: this.props.user.addIdData,
            name: this.state.editData.name,
            email: this.state.editData.email
          };
          this.setState({
            userData: this.state.userData.concat(newData)
          });
        });
      }
    }
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    if (localStorage.usertoken === undefined) {
      this.props.history.push("/login");
    }
    let no = 1;
    return (
      <>
        <div className="wrapper">
          <Sidebar />
          <div id="content">
            <div className="row m-0">
              <div className="col-md-12 p-0">
                <nav className="topmenu navbar navbar-light bg-white p-4">
                  <div className="ml-auto mr-auto">
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                        <h5 className="font-weight-bold m-0">Users</h5>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="col-md-12 p-3">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12 p-0">
                      {!this.props.user.isPending ? (
                        <button
                          className="btn btn-primary font-weight-bold mb-3 px-4"
                          data-toggle="modal"
                          data-target="#categoriesModalLabel"
                          onClick={() => this.handleAdd()}
                        >
                          ADD
                        </button>
                      ) : null}
                      {!this.props.user.isPending ? (
                        <div className="card shadow">
                          <div className="card-body p-0">
                            <div className="table-responsive">
                              <table className="table text-center m-0">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">ACTION</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.userData.map(users => {
                                    return (
                                      <tr key={users.id}>
                                        <th scope="row">{no++}</th>
                                        <td>{users.name}</td>
                                        <td>{users.email}</td>
                                        <td>
                                          <img
                                            src={edit}
                                            style={{ cursor: "pointer" }}
                                            alt="icon"
                                            className="iconbtn mr-sm-1 mr-lg-3"
                                            data-toggle="modal"
                                            data-target="#categoriesModalLabel"
                                            onClick={() =>
                                              this.handleUpdate(users)
                                            }
                                          />
                                          <img
                                            style={{ cursor: "pointer" }}
                                            src={remove}
                                            alt="icon"
                                            className="iconbtn"
                                            onClick={() =>
                                              this.handleRemove(users.id)
                                            }
                                          />
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="loader cardloading">
                          <div className="inner one" />
                          <div className="inner two" />
                          <div className="inner three" />
                          <span>
                            <br />
                            <br />
                            <br />
                            Loading...
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="categoriesModalLabel"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="categoriesModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title font-weight-bold">
                  {this.state.editData.id === null
                    ? "Add Users"
                    : "Update Users"}
                </h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label font-weight-bold">
                      Name
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control shadow-sm border-0"
                        name="name"
                        value={this.state.editData.name}
                        onChange={this.handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label font-weight-bold">
                      Email
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control shadow-sm border-0"
                        name="email"
                        value={this.state.editData.email}
                        onChange={this.handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label font-weight-bold">
                      Password
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className="form-control shadow-sm border-0"
                        name="password"
                        value={this.state.editData.password}
                        onChange={this.handleFormChange}
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary font-weight-bold px-3 mr-2"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  value="Submit"
                  type="submit"
                  className="btn btn-primary font-weight-bold px-4"
                  data-dismiss="modal"
                  onClick={e => this.handleSubmit(e)}
                >
                  {this.state.editData.id === null ? "Add" : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStateToProps)(Users);
