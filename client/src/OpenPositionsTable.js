import React, { Component } from 'react';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ButtonGroup, Grid, Button } from '@material-ui/core';

class OpenPositionsTable extends Component {
  constructor() {
    super()
    this.state = {
      positions:[],
    }
  }

  getData() {
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

  componentDidMount() {
    this.getData();
  }

  render() {
    return(
      <React.Fragment>
        <Title>Open Positions</Title>
        <Grid container direction="row" justify="flex-start" spacing={3}>
          <Grid item xs={6}>
            <ButtonGroup color="primary" aria-label="contained primary button group" p={0.5}>
                <Button variant="contained" onClick={() => this.getData()}>Refresh</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
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
