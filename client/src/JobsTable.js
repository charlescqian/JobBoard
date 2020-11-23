import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Button, ButtonGroup, Grid, Checkbox, TextField } from '@material-ui/core';

class JobsTable extends Component {
    constructor() {
        super();
        this.state = {
            jobs: [],
            jobID:'',
        };

        this.getjobs = this.getjobs.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.performdelete = this.performdelete.bind(this);
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

    handleTextChange (e) {
        this.setState({ [e.target.name] : e.target.value});
    }

    performdelete = async () => {
        console.log(this.state.jobID);
        fetch(`/api/delete/${this.state.jobID}`)
            .then(res => {
                if(res.status !== 200) {
                    console.log(res.status);
                    return [];
                }
                else return res.json();
            })
    }


    render() {
        return (
            <React.Fragment>
                <Title>Current Job List</Title>
                <Grid container direction="row" justify="flex-end" spacing={3}>
                    <Grid item xs={6}>
                        <ButtonGroup color="primary" aria-label="contained primary button group" p={0.5}>
                            <Button
                                variant="contained"
                                onClick={this.getjobs}
                                >Click to Load
                            </Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            name='jobID'
                            value={this.state.jobID}
                            type='number'
                            onChange={this.handleTextChange}/>
                    </Grid>
                    <Grid item xs={3}>
                        <ButtonGroup color="primary" aria-label="contained primary button group" p={0.5}>
                            <Button
                                variant="contained"
                                onClick={this.performdelete}
                            >Delete
                            </Button>
                        </ButtonGroup>
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