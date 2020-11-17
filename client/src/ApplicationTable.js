import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Button, TextField, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

class ApplicationTable extends Component {
  constructor() {
    super();
    this.state = {
      applications: [],
      postingID: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.getApplications = this.getApplications.bind(this);
  }

  handleChange({target}) {
    this.setState({
      [target.name]: target.value
    });
  }

  getApplications = async () => {
    console.log(this.state.postingID);
    fetch(`/api/applications/${this.state.postingID}`)
    .then(res => {
      if(res.status !== 200) {
        console.log(res.status);
        return [];
      }
      else return res.json();
    })
    .then(res => this.setState({applications: res}))
  }

  render() {
    
    return(
      <React.Fragment>
        <Title>Applications</Title>
        <Grid container direction="row" justify="flex-end" spacing={3}>
          <Grid item xs={3}>
            <TextField 
              id="posting" 
              name="postingID"
              label="Posting ID" 
              value={this.state.postingID}
              type='number'
              onChange={this.handleChange}/>
          </Grid>
          <Grid item xs={3}>
            <Button 
              variant="contained" 
              onClick={this.getApplications}
              >Search</Button>
          </Grid>
        </Grid>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Time Applied</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Resume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.applications.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.timeApplied}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell><a href={`/resume/${row.resume}`}>{row.resume}</a></TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" style={{textTransform: 'none'}}>
                    Interview
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}


export default withStyles(useStyles)(ApplicationTable);
