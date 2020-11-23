import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Button, ButtonGroup, Grid, Checkbox } from '@material-ui/core';

class JobsTable extends Component {
    constructor() {
        super();
        this.state = {
            jobs: [],

        };

        this.getjobs = this.getjobs.bind(this);

        }

        getjobs = async() => {
             fetch(`/api/jobs/`)
            .then(res=> {
            if(res.status !== 200) {
                console.log(res.status);
                return [];
            }
            else return res.json();
        })
        .then(res => this.setState({jobs: res}))
    }


render() {
    return (
        <React.Fragment>
            <Title>Current Job List</Title>
            <Grid container direction="row" justify="flex-end" spacing={3}>
                <Grid item xs={9}>
                      <Button
                            variant="contained"
                            onClick={this.getjobs}
                        >Click to Load</Button>
                                 </Grid>
            </Grid>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Job ID</TableCell>
                        <TableCell>Salary</TableCell>
                        <TableCell>Industry</TableCell>
                        <TableCell>Title</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.jobs.map((row) =>  (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.salary}</TableCell>
                            <TableCell>{row.industryType}</TableCell>
                            <TableCell>{row.jobTitle}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
}

export default JobsTable;