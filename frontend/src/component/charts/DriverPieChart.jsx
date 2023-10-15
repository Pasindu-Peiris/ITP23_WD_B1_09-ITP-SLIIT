import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors:['#ff9100', '#2ec4b6'],
        labels: ['Active Drivers', 'Inactive Drivers'],
        
      },
      series: [10, 2],
      
    }
  }

  render() {

    return (
        <div class="card">
            <div class="card-body bg-transparent">
                <h5 class="card-title fw-bold">Active & Inactive Drivers</h5>
                <div className="donut">
                    <Chart options={this.state.options} series={this.state.series} type="donut" width="350" />
                </div>
            </div>
        </div>
      
    );
  }
}

export default Donut;