import React, { Component } from 'react';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class OpenPositionsTable extends Component {
  constructor() {
    super()
    this.state = {
      positions:[],
    }
  }

  componentDidMount() {
    fetch('/api/openPositions/')
    .then(res => {
      if(res.status !== 200) {
        console.log(res.status);
        return [];
      }
      else return res.json();
    })
    .then(res => this.setState({positions: res}))
  }

  render() {
    return(
      <React.Fragment>
        <Title>Open Positions</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Posting ID</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Date Posted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.positions.map((row) => (
              <TableRow>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default OpenPositionsTable;
