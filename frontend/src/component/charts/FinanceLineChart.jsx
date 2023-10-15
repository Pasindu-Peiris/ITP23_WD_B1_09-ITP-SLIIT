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
          categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        }
      },
      series: [
        {
          name: "Income",
          data: [0,0,0,0,0,0,0,100000,125000,275000,300000,500000]
        }
      ]
    };
  }

  render() {
    return (
        <div class="card">
            <div class="card-body bg-transparent">
                <h5 class="card-title fw-bold">Financial Income</h5>
                <div className="app">
                    <div className="row">
                        <div className="mixed-chart">
                            <Chart
                                options={this.state.options}
                                series={this.state.series}
                                type="line"
                                width="800"
                                height="164"
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