import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors:['#6351ce', '#6351ce80'],
        labels: ['A', 'B'],
        
      },
      series: [44, 55],
      
    }
  }

  render() {

    return (
        <div class="card">
            <div class="card-body bg-transparent">
                <h5 class="card-title fw-bold">Company & Owner Vehicles</h5>
                <div className="donut">
                    <Chart options={this.state.options} series={this.state.series} type="donut" width="380" height="175" />
                </div>
            </div>
        </div>
      
    );
  }
}

export default Donut;