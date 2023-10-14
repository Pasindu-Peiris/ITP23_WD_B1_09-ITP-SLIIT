import React, { Component } from "react";
import Chart from "react-apexcharts"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors:['#6351ce'],

        grid: {
          row: {
            colors: ['#6351ce80']
          }
        },

        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }

  render() {
    return (
        <div class="card">
            <div class="card-body bg-transparent">
                <h5 class="card-title">Financial Income</h5>
                <div className="app">
                    <div className="row">
                        <div className="mixed-chart">
                            <Chart
                                options={this.state.options}
                                series={this.state.series}
                                type="line"
                                width="500"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
  }
}

export default App;