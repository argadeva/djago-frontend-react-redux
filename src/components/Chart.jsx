import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Axios from "axios";

export default class Chart extends Component {
  state = {
    data: [],
    chartData: {}
  };

  getChart = () => {
    this.setState({
      chartData: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        datasets: [
          {
            label: "This Week",
            data: this.state.data,
            fill: false,
            backgroundColor: "#FFB8C6",
            borderColor: "#FFB8C6",
            pointStyle: "circle",
            borderWidth: 3
          }
        ]
      }
    });
  };

  componentDidMount() {
    Axios.get(process.env.REACT_APP_URL_API + `history/incomeweek`, {
      headers: { "x-access-token": localStorage.usertoken }
    })
      .then(res => {
        this.setState({
          data: res.data.result.map(val => val.total)
        });
      })
      .then(() => {
        this.getChart();
      });
  }

  render() {
    return (
      <>
        <div className="card mb-4 shadow p-4">
          <h3 className="font-weight-bold mb-4">Revenue</h3>
          <div>
            <Line
              data={this.state.chartData}
              width={100}
              height={400}
              options={{
                maintainAspectRatio: false,
                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    usePointStyle: true,
                    padding: 20
                  }
                },
                scales: {
                  xAxes: [
                    {
                      display: false
                    }
                  ],
                  yAxes: [
                    {
                      gridLines: {
                        drawBorder: false
                      },
                      ticks: {
                        beginAtZero: true,
                        userCallback: function(label, index, labels) {
                          if (Math.floor(label) === label) {
                            return label / 1e3 + "K";
                          }
                        }
                      }
                    }
                  ]
                }
              }}
            />
          </div>
        </div>
      </>
    );
  }
}
