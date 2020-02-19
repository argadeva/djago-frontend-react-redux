import React, { Component } from "react";
import Sidebar from "./Sidebar";
import food from "../images/food-and-restaurant.png";
import tick from "../images/tick.png";
import { connect } from "react-redux";
import { getProducts } from "../redux/actions/products";
import { checkout, getCheckoutDetail } from "../redux/actions/checkout";
import Axios from "axios";
import qs from "qs";

class Sales extends Component {
  state = {
    productData: [],
    carts: [],
    checkoutDetail: [],
    search: ""
  };

  getProduct = async () => {
    await this.props.dispatch(getProducts());
    this.setState({
      productData: this.props.products.productData.result
    });
  };

  getCheckoutDetail = async idCheckout => {
    await this.props.dispatch(getCheckoutDetail(idCheckout));
    this.setState({
      checkoutDetail: this.props.checkout.checkoutDetailData.result
    });
  };

  selectedProduct = product => {
    if (product.stock > 0) {
      const index = this.state.carts.findIndex(function(onCarts) {
        return onCarts.id === product.id;
      });
      if (index < 0) {
        var newProduct = Object.assign(product, { qty: 1 });
        this.setState({
          carts: this.state.carts.concat(newProduct)
        });
        // document.getElementById(
        //   product.id
        // ).innerHTML += `<div class="overlay" id="V${product.id}"><img src=${tick} alt="overlay" /></div>`;
      }
    }
  };

  plusProduct = id => {
    const index = this.state.carts.findIndex(function(onCarts) {
      return onCarts.id === id;
    });
    let carts = [...this.state.carts];
    let cart = { ...carts[index] };
    cart.qty += 1;
    carts[index] = cart;
    if (this.state.carts[index].stock >= cart.qty) {
      this.setState({ carts });
    }
  };

  minProduct = id => {
    const index = this.state.carts.findIndex(function(onCarts) {
      return onCarts.id === id;
    });
    if (this.state.carts[index].qty > 1) {
      let carts = [...this.state.carts];
      let cart = { ...carts[index] };
      cart.qty -= 1;
      carts[index] = cart;
      this.setState({ carts });
    } else {
      const carts = this.state.carts.filter(cart => cart.id !== id);
      this.setState({ carts: carts });
    }
  };

  cancelCart = () => {
    this.setState({
      carts: []
    });
  };

  submitCart = async () => {
    if (this.state.carts.length !== 0) {
      const number = Date.now();
      await Axios.post(
        process.env.REACT_APP_URL_API + "/checkout",
        { order_number: number },
        {
          headers: { "x-access-token": localStorage.usertoken }
        }
      ).then(response => {
        for (let i = 0; i < this.state.carts.length; i++) {
          const bodyFormData = qs.stringify({
            order_id: response.data.result.insertId,
            product_id: this.state.carts[i].id,
            qty: this.state.carts[i].qty
          });
          this.props.dispatch(checkout(bodyFormData));
        }
        setTimeout(() => {
          this.getCheckoutDetail(response.data.result.insertId);
        }, 1000);
      });
      await this.cancelCart();
      await this.getProduct();
    }
  };

  componentDidMount = () => {
    this.getProduct();
  };

  handleSearch = e => {
    e.preventDefault();
    this.setState({
      search: e.target.value
    });
  };

  render() {
    if (localStorage.usertoken === undefined) {
      this.props.history.push("/login");
    }
    function formatNumber(num) {
      return "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    let countTotal = this.state.carts.reduce(function(prev, cur) {
      return prev + cur.price * cur.qty;
    }, 0);

    let countTotals = formatNumber(countTotal);

    function filterByValue(array, string) {
      return array.filter(name =>
        Object.keys(name).some(value =>
          name[value]
            .toString()
            .toLowerCase()
            .includes(string.toString().toLowerCase())
        )
      );
    }

    return (
      <>
        <div className="wrapper">
          <Sidebar />
          <div id="content">
            <div className="row m-0">
              <div className="col-md-8 p-0">
                <nav className="topmenu navbar navbar-light bg-white p-4">
                  <div className="ml-auto mr-auto">
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                        <h5 className="font-weight-bold m-0">Food Items</h5>
                      </li>
                    </ul>
                  </div>
                  <form id="demo-2">
                    <input
                      type="search"
                      placeholder="Search"
                      onChange={this.handleSearch}
                    ></input>
                  </form>
                </nav>
                <div className="py-3 px-2">
                  {!this.props.products.isPending ? (
                    <div className="container">
                      {filterByValue(this.state.productData, this.state.search)
                        .length !== 0 ? (
                        <div className="row">
                          {filterByValue(
                            this.state.productData,
                            this.state.search
                          ).map(products => {
                            const index = this.state.carts.findIndex(function(
                              onCarts
                            ) {
                              return onCarts.id === products.id;
                            });
                            return (
                              <div
                                className="col-md-4 px-2 mb-4"
                                key={products.id}
                                onClick={() => this.selectedProduct(products)}
                                style={{ cursor: "pointer" }}
                              >
                                <div
                                  className="card bg-transparent border-0"
                                  id={products.id}
                                >
                                  {products.image !== "" ? (
                                    <img
                                      src={products.image}
                                      className="card-img-top shadow"
                                      alt={products.name}
                                    />
                                  ) : (
                                    <img
                                      src="/assets/image/noimage.jpg"
                                      className="card-img-top shadow"
                                      alt={products.name}
                                    />
                                  )}
                                  {index >= 0 ? (
                                    <div
                                      className="overlay"
                                      id={"V" + products.id}
                                    >
                                      <img src={tick} alt="overlay" />
                                    </div>
                                  ) : null}
                                </div>
                                <h6 className="card-title font-weight-normal my-2">
                                  {products.name}
                                </h6>
                                <h6 className="card-title font-weight-bold m-0">
                                  {formatNumber(products.price)}
                                </h6>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="container">
                          <h1 className="text-center mt-5">
                            Product Not Found!
                          </h1>
                        </div>
                      )}
                    </div> /////
                  ) : (
                    <div className="loader">
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
              <div className="col-md-4 p-0 bg-white cart">
                <nav className="topmenu navbar navbar-light bg-white p-4 shadow-sm">
                  <div className="ml-auto mr-auto">
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                        <h5 className="font-weight-bold m-0">
                          Cart
                          <button className="btn btn-primary rounded-circle px-1 nocart ml-2">
                            &nbsp;{this.state.carts.length}&nbsp;
                          </button>
                        </h5>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="p-4 cartside">
                  <div className="container">
                    <div className="row">
                      {this.state.carts.length === 0 ? (
                        <div className="mx-auto text-center">
                          <img src={food} alt="Food" />
                          <h4 className="font-weight-bold carttext">
                            Your cart is empty
                          </h4>
                          <span className="small text-muted">
                            Please add some items from the menu
                          </span>
                        </div>
                      ) : (
                        this.state.carts.map(cartList => {
                          return (
                            <div
                              className="card mb-4 border-0"
                              key={cartList.id}
                            >
                              <div className="row no-gutters">
                                <div className="col-md-3">
                                  {cartList.image !== "" ? (
                                    <img
                                      src={cartList.image}
                                      className="card-img-top"
                                      alt={cartList.name}
                                    />
                                  ) : (
                                    <img
                                      src="/assets/image/noimage.jpg"
                                      className="card-img-top"
                                      alt={cartList.name}
                                    />
                                  )}
                                </div>
                                <div className="col-md-9">
                                  <div className="card-body py-0 pl-2">
                                    <h6 className="card-title font-weight-bold mb-0">
                                      {cartList.name}
                                    </h6>
                                  </div>
                                  <div className="cartbutton pl-2">
                                    <div className="row">
                                      <div className="col pr-0">
                                        <button
                                          type="button"
                                          className="btn btn-sm font-weight-bold btn-outline-success rounded-0"
                                          onClick={() =>
                                            this.minProduct(cartList.id)
                                          }
                                        >
                                          -
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-sm font-weight-bold btn-outline-success rounded-0"
                                          disabled
                                        >
                                          {cartList.qty}
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-sm font-weight-bold btn-outline-success rounded-0"
                                          onClick={() =>
                                            this.plusProduct(cartList.id)
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                      <div className="d-flex align-content-center flex-wrap mr-3">
                                        <div className="float-right font-weight-bold">
                                          {formatNumber(
                                            cartList.price * cartList.qty
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
                {this.state.carts.length !== 0 ? (
                  <div className="cartbtn p-4">
                    <div className="row">
                      <div className="col-md-3">
                        <h5 className="font-weight-bold">Total:</h5>
                      </div>
                      <div className="col text-right">
                        <h5 className="font-weight-bold">{countTotals}</h5>
                      </div>
                    </div>
                    <p className="mb-2">*Belum termasuk ppn</p>
                    <button
                      type="button"
                      className="btn btn-primary btn-block mb-3 font-weight-bold"
                      data-toggle="modal"
                      data-target="#checkoutModal"
                      onClick={() => this.submitCart()}
                    >
                      Checkout
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-block font-weight-bold"
                      onClick={() => this.cancelCart()}
                    >
                      Cancel
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="checkoutModal">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                {!this.props.checkout.isDetailFulfilled ? (
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
                ) : (
                  <div className="container">
                    <div className="row">
                      <div className="col-3">
                        <h5 className="font-weight-bold">Checkout</h5>
                        <p className="text-body font-weight-bold">
                          Cashier:&nbsp;
                          <span>
                            {this.props.checkout.checkoutDetailData.name}
                          </span>
                        </p>
                      </div>
                      <div className="col-9 text-right">
                        <p className="text-body text-body font-weight-bold">
                          Reciept no:&nbsp;#
                          {this.props.checkout.checkoutDetailData.order_number}
                        </p>
                      </div>
                    </div>
                    {this.props.checkout.checkoutDetailData.products.map(
                      detail => {
                        return (
                          <div className="row" key={detail.id}>
                            <div className="col-md-7">
                              <p className="text-body font-weight-bold">
                                {detail.name + "  " + detail.qty}x
                              </p>
                            </div>
                            <div className="col-md-5 text-right">
                              <p className="text-body font-weight-bold">
                                {formatNumber(detail.total)}
                              </p>
                            </div>
                          </div>
                        );
                      }
                    )}
                    <div className="row">
                      <div className="col-md-7">
                        <p className="text-body text-body font-weight-bold">
                          Ppn 10%
                        </p>
                      </div>
                      <div className="col-md-5 text-right">
                        <p className="text-body text-body font-weight-bold">
                          {formatNumber(
                            parseInt(this.props.checkout.checkoutDetailData.ppn)
                          )}
                        </p>
                      </div>
                      <div className="col-12 text-right">
                        <p className="text-body text-body font-weight-bold">
                          <span className="mr-3">Total:</span>
                          {formatNumber(
                            parseInt(
                              this.props.checkout.checkoutDetailData.total
                            )
                          )}
                        </p>
                      </div>
                      <div className="col-12">
                        <p className="text-body text-body font-weight-bold">
                          Payment: Cash
                        </p>
                      </div>
                    </div>
                    <button
                      className="btn btn-secondary btn-block font-weight-bold"
                      onClick={() => window.print()}
                    >
                      Print
                    </button>
                    <h5 className="text-center my-2 font-weight-bold">Or</h5>
                    <button className="btn btn-primary btn-block font-weight-bold">
                      Send Email
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ products, checkout }) => {
  return {
    products,
    checkout
  };
};

export default connect(mapStateToProps)(Sales);
