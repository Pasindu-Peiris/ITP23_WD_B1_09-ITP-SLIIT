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
          name: "Tours",
          data: [0, 0, 0, 0, 0, 0, 0, 2, 5,10,0,0]
        }
      ]
    };
  }

  render() {
    return (
        <div class="card">
            <div class="card-body bg-transparent">
                <h5 class="card-title fw-bold">Published Tours</h5>
                <div className="app">
                    <div className="row">
                        <div className="mixed-chart">
                            <Chart
                                options={this.state.options}
                                series={this.state.series}
                                type="bar"
                                width="400"
                                height="470"
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