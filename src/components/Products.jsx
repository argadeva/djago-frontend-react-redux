import React, { Component } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  paginationProducts,
  addProducts,
  editProducts,
  deleteProducts
} from "../redux/actions/products";
import { getCategories } from "../redux/actions/categories";
import edit from "../images/edit.png";
import remove from "../images/delete.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class Products extends Component {
  state = {
    productData: [],
    totalPage: "",
    empty: "",
    editData: {
      id: null,
      name: "",
      image: "",
      price: 0,
      category_id: null,
      stock: 0,
      description: ""
    },
    image: false,
    categoriesData: [],
    sort: "created_at"
  };

  getProducts = async () => {
    await this.props.dispatch(
      paginationProducts(this.props.match.params.page, this.state.sort)
    );
    this.setState({
      productData: this.props.products.paginationData.data,
      totalPage: this.props.products.paginationData.totalPage
    });
  };

  getCategories = async () => {
    await this.props.dispatch(getCategories());
    this.setState({
      categoriesData: this.props.categories.categoriesData.result
    });
  };

  handleAdd = () => {
    document.getElementById("uploadFile").value = "";
    document.getElementById("categories").value = "";
    this.setState({
      editData: {
        id: null,
        name: "",
        image: "",
        price: 0,
        category_id: null,
        stock: 0,
        description: ""
      }
    });
  };

  handleUpdate = data => {
    document.getElementById("uploadFile").value = "";
    this.setState({
      image: false,
      editData: {
        id: data.id,
        name: data.name,
        image: data.image,
        price: data.price,
        category_id: data.category_id,
        stock: data.stock,
        description: data.description
      }
    });
  };

  handlePage = async page => {
    await this.props.dispatch(
      paginationProducts(page, this.props.products.sort)
    );
    this.setState({
      productData: this.props.products.paginationData.data
    });
  };

  handleFormChange = e => {
    const editDatas = this.state.editData;
    editDatas[e.target.name] = e.target.value;
    this.setState({
      editDatas
    });
  };

  handleSort = async e => {
    await this.props.dispatch(
      paginationProducts(this.props.match.params.page, e.target.value)
    );
    this.setState({
      productData: this.props.products.paginationData.data
    });
  };

  handleFileUpload = event => {
    this.setState({ image: true });
    const editDatas = this.state.editData;
    editDatas.image = event.target.files[0];
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
        this.props.dispatch(deleteProducts(id)).then(() => {
          MySwal.fire({
            title: "Deleted!",
            text: "Your file has been deleted!",
            icon: "success"
          });
          const index = this.state.productData.findIndex(function(onData) {
            return onData.id === id;
          });
          let array = [...this.state.productData];
          array.splice(index, 1);
          this.setState({ productData: array });
        });
      }
    });
  };

  handleSubmit = async e => {
    const formValidationText = data => {
      // eslint-disable-next-line
      let Regex = /^[a-zA-Z][a-zA-Z- ]*$/;
      return Regex.test(data);
    };

    const formValidationNumber = data => {
      // eslint-disable-next-line
      let Regex = /^[1-9][0-9]*$/;
      return Regex.test(data);
    };

    if (
      !formValidationText(
        this.state.editData.name || this.state.editData.description
      )
    ) {
      MySwal.fire({
        title: "Oops...",
        text: "Name or description must be only word and space!",
        icon: "error"
      });
    } else if (
      !formValidationNumber(
        this.state.editData.price || this.state.editData.stock
      )
    ) {
      MySwal.fire({
        title: "Oops...",
        text: "Price or stock must be only minimum 1 positive number!",
        icon: "error"
      });
    } else if (
      this.state.editData.category_id === null ||
      this.state.editData.category_id === ""
    ) {
      MySwal.fire({
        title: "Oops...",
        text: "Categories must be selected!",
        icon: "error"
      });
    } else {
      e.preventDefault();
      if (this.state.editData.id !== null) {
        this.props
          .dispatch(editProducts(this.state.editData))
          .catch(() => {
            console.log(this.props.products.isRejected);
          })
          .then(() => {
            if (this.props.products.isRejected) {
              MySwal.fire({
                title: "Error!",
                text: "Edit Products Failed!",
                icon: "error"
              });
            } else {
              MySwal.fire({
                title: "Good Job!",
                text: "Edit Products Success!",
                icon: "success"
              });
              let id = this.state.editData.id;
              const index = this.state.productData.findIndex(function(onData) {
                return onData.id === id;
              });
              let catId = parseInt(this.state.editData.category_id);
              let index2 = this.state.categoriesData.findIndex(
                x => x.id === catId
              );
              let datas = [...this.state.productData];
              let data = { ...datas[index] };
              data.name = this.state.editData.name;
              data.image =
                this.state.editData.image.name === undefined
                  ? this.state.editData.image
                  : process.env.REACT_APP_URL_UPLOADS +
                    "file-" +
                    this.state.editData.image.name;
              data.price = this.state.editData.price;
              data.category_id = this.state.editData.category_id;
              data.categories = this.state.categoriesData[index2].name;
              data.stock = this.state.editData.stock;
              data.description = this.state.editData.description;
              datas[index] = data;
              this.setState({ productData: datas });
            }
          });
      } else {
        this.props
          .dispatch(addProducts(this.state.editData))
          .catch(() => {
            console.log(this.props.products.isRejected);
          })
          .then(() => {
            if (this.props.products.isRejected) {
              MySwal.fire({
                title: "Error!",
                text: "Edit Products Failed!",
                icon: "error"
              });
            } else {
              MySwal.fire({
                title: "Good Job!",
                text: "Add Products Success!",
                icon: "success"
              });
              let catId = parseInt(this.state.editData.category_id);
              let index = this.state.categoriesData.findIndex(
                x => x.id === catId
              );
              let newData = {
                id: this.props.products.addIdData,
                name: this.state.editData.name,
                price: this.state.editData.price,
                image:
                  this.state.editData.image.name === undefined
                    ? ""
                    : process.env.REACT_APP_URL_UPLOADS +
                      "file-" +
                      this.state.editData.image.name,
                categories: this.state.categoriesData[index].name,
                stock: this.state.editData.stock,
                description: this.state.editData.description
              };

              this.setState({
                productData: this.state.productData.concat(newData)
              });
            }
          });
      }
    }
  };

  componentDidMount() {
    this.getProducts();
    this.getCategories();
  }

  render() {
    if (localStorage.usertoken === undefined) {
      this.props.history.push("/login");
    } else if (this.props.products.paginationData.totalPage > 0) {
      if (
        this.props.match.params.page >
        this.props.products.paginationData.totalPage
      ) {
        window.location = `/products/${this.props.products.paginationData.totalPage}`;
      }
    }
    let no = 1;

    function formatNumber(num) {
      return "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    let startFromNumber = 1;
    let pages = [];
    for (let i = 1; i <= this.state.totalPage; i++) {
      pages.push(startFromNumber++);
    }

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
                        <h5 className="font-weight-bold m-0">Products</h5>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="col-md-12 p-3">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12 p-0">
                      {!this.props.products.isPending ? (
                        <div className="row">
                          <div className="col-md-3">
                            <button
                              className="btn btn-primary font-weight-bold mb-3 px-4"
                              data-toggle="modal"
                              data-target="#addModalLabel"
                              onClick={() => this.handleAdd()}
                            >
                              ADD
                            </button>
                          </div>
                          <div className="col-md-2 ml-auto">
                            <select
                              className="custom-select shadow-sm border-0"
                              name="sort"
                              onChange={this.handleSort}
                              required
                            >
                              {this.props.products.sort === "created_at" ? (
                                <option value="created_at" selected>
                                  Date
                                </option>
                              ) : (
                                <option value="created_at">Date</option>
                              )}
                              {this.props.products.sort === "name" ? (
                                <option value="name" selected>
                                  Name
                                </option>
                              ) : (
                                <option value="name">Name</option>
                              )}
                              {this.props.products.sort === "category_id" ? (
                                <option value="category_id" selected>
                                  Categories
                                </option>
                              ) : (
                                <option value="category_id">Categories</option>
                              )}
                            </select>
                          </div>
                        </div>
                      ) : null}
                      {!this.props.products.isPending ? (
                        <div className="card shadow">
                          <div className="card-body p-0">
                            <div className="table-responsive">
                              <table className="table text-center m-0">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">IMAGE</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">CATEGORIES</th>
                                    <th scope="col">STOCK</th>
                                    <th scope="col">DESCRIPTION</th>
                                    <th scope="col">ACTION</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.productData.map(products => {
                                    return (
                                      <tr key={products.id}>
                                        <th scope="row">{no++}</th>
                                        <td>{products.name}</td>
                                        <td>
                                          {products.image !== "" ? (
                                            <img
                                              src={products.image}
                                              alt="data"
                                              style={{ width: 50 }}
                                            />
                                          ) : (
                                            <img
                                              src="/assets/image/noimage.jpg"
                                              alt="data"
                                              style={{ width: 50 }}
                                            />
                                          )}
                                        </td>
                                        <td>{formatNumber(products.price)}</td>
                                        <td>{products.categories}</td>
                                        <td>{products.stock}</td>
                                        <td>{products.description}</td>
                                        <td>
                                          <p className="m-0">
                                            <img
                                              src={edit}
                                              style={{ cursor: "pointer" }}
                                              alt="icon"
                                              className="iconbtn mr-sm-1 mr-lg-3"
                                              data-toggle="modal"
                                              data-target="#addModalLabel"
                                              onClick={() =>
                                                this.handleUpdate(products)
                                              }
                                            />
                                            <img
                                              style={{ cursor: "pointer" }}
                                              src={remove}
                                              alt="icon"
                                              className="iconbtn"
                                              onClick={() =>
                                                this.handleRemove(products.id)
                                              }
                                            />
                                          </p>
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
            <div className="col-md-12 my-3">
              <nav>
                <ul className="pagination  justify-content-center">
                  {this.props.match.params.page !== "1" ? (
                    <li className="page-item">
                      <Link
                        to={
                          `/products/` +
                          (parseInt(this.props.match.params.page) - 1)
                        }
                        className="page-link font-weight-bold"
                        onClick={() =>
                          this.handlePage(
                            parseInt(this.props.match.params.page) - 1
                          )
                        }
                      >
                        Previous
                      </Link>
                    </li>
                  ) : null}
                  {pages.map((page, index) => (
                    <li
                      key={page}
                      className={
                        parseInt(this.props.match.params.page) ===
                        parseInt(page)
                          ? "page-item active"
                          : "page-item"
                      }
                    >
                      <Link
                        to={`/products/` + page}
                        onClick={() => this.handlePage(page)}
                        className="page-link font-weight-bold"
                      >
                        {page}
                      </Link>
                    </li>
                  ))}
                  {this.props.match.params.page < this.state.totalPage ? (
                    <li className="page-item">
                      <Link
                        to={
                          `/products/` +
                          (parseInt(this.props.match.params.page) + 1)
                        }
                        onClick={() =>
                          this.handlePage(
                            parseInt(this.props.match.params.page) + 1
                          )
                        }
                        className="page-link font-weight-bold"
                      >
                        Next
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="addModalLabel"
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
                    ? "Add Products"
                    : "Update Products"}
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
                      Image
                    </label>
                    <div className="col-sm-9">
                      <div className="custom-file">
                        {this.state.editData.image !== "" &&
                        !this.state.image ? (
                          <img
                            src={this.state.editData.image}
                            alt="data"
                            style={{ width: 100 }}
                            className="mb-3"
                          />
                        ) : null}
                        <input
                          id="uploadFile"
                          type="file"
                          onChange={this.handleFileUpload}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label font-weight-bold">
                      Price
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="number"
                        min="0"
                        className="form-control shadow-sm border-0"
                        name="price"
                        value={this.state.editData.price}
                        onChange={this.handleFormChange}
                        step="any"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label font-weight-bold">
                      Categories
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="custom-select shadow-sm border-0"
                        name="category_id"
                        id="categories"
                        onChange={this.handleFormChange}
                        required
                      >
                        <option value="">Choose...</option>
                        {this.state.categoriesData.map(categories => {
                          if (
                            categories.id === this.state.editData.category_id
                          ) {
                            return (
                              <option
                                key={categories.id}
                                value={categories.id}
                                selected
                              >
                                {categories.name}
                              </option>
                            );
                          } else {
                            return (
                              <option key={categories.id} value={categories.id}>
                                {categories.name}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label font-weight-bold">
                      Stock
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="number"
                        min="0"
                        value={this.state.editData.stock}
                        className="form-control shadow-sm border-0"
                        name="stock"
                        onChange={this.handleFormChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label font-weight-bold">
                      Description
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        value={this.state.editData.description}
                        className="form-control shadow-sm border-0"
                        name="description"
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

const mapStateToProps = ({ products, categories }) => {
  return {
    products,
    categories
  };
};

export default connect(mapStateToProps)(Products);
