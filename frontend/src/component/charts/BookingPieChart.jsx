import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Donut extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors:['#16db65', '#ef233c'],
        labels: ['Completed', 'Canceled'],
        
      },
      series: [10, 5],
      
    }
  }

  render() {

    return (
        <div class="card">
            <div class="card-body bg-transparent">
                <h5 class="card-title fw-bold">Bookings & Reservations</h5>
                <div className="donut">
                    <Chart options={this.state.options} series={this.state.series} type="donut" width="350" height="175"  />
                </div>
            </div>
        </div>
      
    );
  }
}

export default Donut;