import React, { Component } from 'react';
import { BarChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import Title from './Title';
import { Button, ButtonGroup } from '@material-ui/core';

class Chart extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
    }
  }

  getData = async daysBack => {
    console.log(daysBack)
    fetch(`/api/numApplicationsByDay/${daysBack}`)
    .then(res => {
      if(res.status !== 200) {
        console.log(res.status);
        return [];
      }
      else return res.json();
    })
    .then(res => this.setState({data: res}))
  }

  render() {
    return (
      <React.Fragment>
        <Title># of Applications by Day</Title>
        <ButtonGroup color="primary" aria-label="contained primary button group" p={0.5}>
          <Button variant="contained" onClick={() => this.getData(7)}>Last 7 Days</Button>
          <Button variant="contained" onClick={() => this.getData(14)}>Last 14 Days</Button>
          <Button variant="contained" onClick={() => this.getData(30)}>Last 30 Days</Button>
          <Button variant="contained" onClick={() => this.getPostings(90)}>Last 90 Days</Button>
        </ButtonGroup>
        <ResponsiveContainer>
          <BarChart width={730} height={250} data={this.state.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date"/>
            <YAxis allowDecimals={false}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}
export default Chart;
