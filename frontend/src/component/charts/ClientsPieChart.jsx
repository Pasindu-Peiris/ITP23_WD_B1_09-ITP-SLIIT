import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors:['#f4e409', '#3f37c9'],
        labels: ['Active Clients', 'Inactive Clients'],
        
      },
      series: [4, 1],
      
    }
  }

  render() {

    return (
        <div class="card">
            <div class="card-body bg-transparent">
                <h5 class="card-title fw-bold">Active & Inactive Clients</h5>
                <div className="donut">
                    <Chart options={this.state.options} series={this.state.series} type="donut" width="350"/>
                </div>
            </div>
        </div>
      
    );
  }
}

export default Donut;