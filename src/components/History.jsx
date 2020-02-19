import React, { Component } from "react";
import Sidebar from "./Sidebar";
import red from "../images/red.png";
import blue from "../images/blue.png";
import violet from "../images/violet.png";
import detail from "../images/detail.png";
import { connect } from "react-redux";
import { getCheckout, getCheckoutDetail } from "../redux/actions/checkout";
import { getHistory } from "../redux/actions/history";
import Chart from "./Chart";

class History extends Component {
  state = {
    checkoutData: [],
    historyData: [],
    detailData: []
  };

  getCheckout = async () => {
    await this.props.dispatch(getCheckout());
    this.setState({
      checkoutData: this.props.checkout.checkoutData.result
    });
  };

  getHistory = async () => {
    await this.props.dispatch(getHistory());
    this.setState({
      historyData: this.props.history.historyData.history
    });
  };

  componentDidMount() {
    this.getCheckout();
    this.getHistory();
  }

  handleDetail = id => {
    this.props.dispatch(getCheckoutDetail(id)).then(result => {
      this.setState({ detailData: result.value.data });
    });
  };

  render() {
    if (localStorage.usertoken === undefined) {
      window.location.replace("/login");
    }

    function formatNumber(num) {
      return "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    let no = 1;

    let todayIncome = this.state.historyData.todayIncome;
    let yesterdayIncome = this.state.historyData.yesterdayIncome;
    let orderthisWeek = this.state.historyData.orderthisWeek;
    let orderlastWeek = this.state.historyData.orderlastWeek;
    let currentYearIncome = this.state.historyData.currentYearIncome;
    let lastYearIncome = this.state.historyData.lastYearIncome;

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
                        <h5 className="font-weight-bold m-0">History</h5>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="col-md-12 py-3 pr-0">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-4 p-0">
                      <div className="card bg-transparent border-0">
                        <img className="card-img" src={red} alt="Card" />
                        <div className="card-img-overlay hcard">
                          <h6 className="card-subtitle font-weight-bold">
                            Today’s Income
                          </h6>
                          <h3 className="card-title my-1 font-weight-bold">
                            {formatNumber(parseInt(todayIncome))}
                          </h3>
                          <h6 className="card-subtitle mt-1 font-weight-bold">
                            {Math.round(
                              (todayIncome / yesterdayIncome) * 100 - 100
                            )}
                            % Yesterday
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 p-0">
                      <div className="card bg-transparent border-0">
                        <img className="card-img" src={blue} alt="Card" />
                        <div className="card-img-overlay hcard">
                          <h6 className="card-subtitle font-weight-bold">
                            Orders
                          </h6>
                          <h3 className="card-title my-1 font-weight-bold">
                            {orderthisWeek}
                          </h3>
                          <h6 className="card-subtitle mt-1 font-weight-bold">
                            {Math.round(
                              (orderthisWeek / orderlastWeek) * 100 - 100
                            )}
                            % Last Week
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 p-0">
                      <div className="card bg-transparent border-0">
                        <img className="card-img" src={violet} alt="Card" />

                        <div className="card-img-overlay hcard">
                          <h6 className="card-subtitle font-weight-bold">
                            This Year’s Income
                          </h6>
                          <h3 className="card-title my-1 font-weight-bold">
                            {formatNumber(parseInt(currentYearIncome))}
                          </h3>
                          <h6 className="card-subtitle mt-1 font-weight-bold">
                            {Math.round(
                              (currentYearIncome / lastYearIncome) * 100 - 100
                            )}
                            % Last Year
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <Chart />
              </div>
              <div className="col-md-12 mt-2">
                {!this.props.checkout.isPending ? (
                  <div className="card shadow">
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table text-center m-0">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">INVOICES</th>
                              <th scope="col">CASHIER</th>
                              <th scope="col">DATE</th>
                              <th scope="col">AMOUNT</th>
                              <th scope="col">DETAILS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.checkoutData.map(checkout => {
                              return (
                                <tr key={checkout.id}>
                                  <th scope="row">{no++}</th>
                                  <td>{checkout.order_number}</td>
                                  <td>{checkout.name}</td>
                                  <td>{checkout.newdate}</td>
                                  <td>{formatNumber(checkout.sub_total)}</td>
                                  <td>
                                    <img
                                      src={detail}
                                      style={{ cursor: "pointer" }}
                                      alt="icon"
                                      className="iconbtn"
                                      data-toggle="modal"
                                      data-target="#checkoutDetailModal"
                                      onClick={() =>
                                        this.handleDetail(checkout.id)
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
        <div className="modal fade" id="checkoutDetailModal">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                {this.state.detailData.length === 0 ? (
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
                          <span>{this.state.detailData.name}</span>
                        </p>
                      </div>
                      <div className="col-9 text-right">
                        <p className="text-body text-body font-weight-bold">
                          Reciept no:&nbsp;#
                          {this.state.detailData.order_number}
                        </p>
                      </div>
                    </div>
                    {this.state.detailData.products.map(detail => {
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
                    })}
                    <div className="row">
                      <div className="col-md-7">
                        <p className="text-body text-body font-weight-bold">
                          Ppn 10%
                        </p>
                      </div>
                      <div className="col-md-5 text-right">
                        <p className="text-body text-body font-weight-bold">
                          {formatNumber(parseInt(this.state.detailData.ppn))}
                        </p>
                      </div>
                      <div className="col-12 text-right">
                        <p className="text-body text-body font-weight-bold">
                          <span className="mr-3">Total:</span>
                          {formatNumber(parseInt(this.state.detailData.total))}
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

const mapStateToProps = ({ checkout, history }) => {
  return {
    checkout,
    history
  };
};

export default connect(mapStateToProps)(History);
