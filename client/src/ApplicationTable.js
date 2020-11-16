import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Button, TextField, Grid } from '@material-ui/core';

// Generate Application Data 
function createData(id, date, name, email, resume) {
  return { id, date, name, email, resume};
}

const rows = [
  // createData(0, '16 Mar, 2019', 'Elvis Presley', 'shazow@comcast.net', 'EPresleyCV.pdf'),
  // createData(1, '16 Mar, 2019', 'Paul McCartney', 'ehood@optonline.net', 'Paul_McCartnery_Resume.pdf'),
  // createData(2, '16 Mar, 2019', 'Tom Scholz', 'blixem@msn.com', 'Tom-S-Resume.pdf'),
  // createData(3, '16 Mar, 2019', 'Michael Jackson', 'emcleod@me.com', 'Micahel-Jackson-Resume-2020.pdf'),
  // createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'esasaki@live.com', 'BSpringsteenResume.pdf'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

class ApplicationTable extends Component {
  constructor() {
    super()
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
    .then(res => res.json())
    // .then(res => console.log(res))
    .then(res => this.setState({applications: res}))
    
  }

  render() {
    const {classes} = this.props;
    return(
      <React.Fragment>
      <Title>Applications</Title>
      <Grid container direction="row" justify="flex-end" spacing={3}>
        <Grid item xs={3}>
          <TextField 
            id="posting" 
            name="postingID"
            label="Posting" 
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
