import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {},
      series: [44, 55, 41, 17, 15],
      labels: ['A', 'B', 'C', 'D', 'E']
    }
  }

  render() {

    return (
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <div className="donut">
                    <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
                </div>
            </div>
        </div>
      
    );
  }
}

export default Donut;