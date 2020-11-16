import React, { Component } from 'react';
import { useTheme, withTheme } from '@material-ui/core/styles';
import { BarChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import Title from './Title';
import { Button, ButtonGroup } from '@material-ui/core';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];
  

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
          <Button onClick={() => this.getData(7)}>Last 7 Days</Button>
          <Button onClick={() => this.getData(14)}>Last 14 Days</Button>
          <Button onClick={() => this.getData(30)}>Last 30 Days</Button>
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
