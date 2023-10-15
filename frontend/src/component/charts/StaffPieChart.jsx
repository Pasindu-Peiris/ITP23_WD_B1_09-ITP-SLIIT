import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors:['#3f37c9','#F26E01'],
        labels: ['Active Employees', 'Inactive Employees'],
        
      },
      series: [20, 5],
      
    }
  }

  render() {

    return (
        <div class="card">
            <div class="card-body bg-transparent">
                <h5 class="card-title fw-bold">Employee Status</h5>
                <div className="donut">
                    <Chart options={this.state.options} series={this.state.series} type="donut" width="380" height="175" />
                </div>
            </div>
        </div>
      
    );
  }
}

export default Donut;