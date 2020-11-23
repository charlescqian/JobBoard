import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Button, TextField, Grid, ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

class UpdateInsert extends Component {
    constructor() {
        super()
        this.state = {
            update: '',
            jobid: '',
            jobType: '',
            jobIndustry: '',
            jobSalary: '',
            jobTitle: '',
            employerID: '',

        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.performUpdate = this.performUpdate.bind(this);
        this.performInsert = this.performInsert.bind(this);
    }

    handleTextChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    performUpdate = async () => {
        console.log(this.state.jobid);
        this.state.update = true;
        fetch(`/api/updateinsert/${this.state.update}/${this.state.jobType}/${this.state.jobIndustry}/${this.state.jobSalary}/${this.state.jobid}/${this.state.jobTitle}/${this.state.employerID}/`)
            .then(res => {
                if (res.status !== 200) {
                    console.log(res.status);
                    return [];
                }
                else return res.json();
            })
    }

    performInsert = async () => {
        console.log(this.state.jobid);
        this.state.update = false;
        fetch(`/api/updateinsert/${this.state.update}/${this.state.jobType}/${this.state.jobIndustry}/${this.state.jobSalary}/${this.state.jobid}/${this.state.jobTitle}/${this.state.employerID}/`)
            .then(res => {
                if (res.status !== 200) {
                    console.log(res.status);
                    return [];
                }
                else return res.json();
            })
    }


    render() {
        return (
            <React.Fragment>
                <Title>Update/Insert</Title>
                <Grid container direction="row" justify="flex-end" spacing={3}>
                    <Grid item xs={3}>
                        <TextField
                            name='jobid'
                            value={this.state.jobid}
                            type='number'
                            label='Job ID'
                            onChange={this.handleTextChange} />
                    </Grid>
                    <Grid item xs={6}>
                        <ButtonGroup color="primary" aria-label="contained primary button group" p={0.5}>
                            <Button
                                variant="contained"
                                onClick={this.performUpdate}
                            >Update
                            </Button>
                            <Button
                                variant="contained"
                                onClick={this.performInsert}
                            >Insert
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <Grid container direction="column" justify="flex-end" spacing={3}>
                    <TextField
                        name='jobType'
                        value={this.state.jobType}
                        type='text'
                        label='Job Type'
                        onChange={this.handleTextChange} />
                    <TextField
                        name='jobIndustry'
                        value={this.state.jobIndustry}
                        type='text'
                        label='Job Industry'
                        onChange={this.handleTextChange} />
                    <TextField
                        name='jobSalary'
                        value={this.state.jobSalary}
                        type='number'
                        label='Job Salary'
                        onChange={this.handleTextChange} />
                    <TextField
                        name='jobTitle'
                        value={this.state.jobTitle}
                        type='text'
                        label='Job Title'
                        onChange={this.handleTextChange} />
                    <TextField
                        name='employerID'
                        value={this.state.employerID}
                        type='number'
                        label='Employer ID'
                        onChange={this.handleTextChange} />
                </Grid>
            </React.Fragment>
        );
    }
}
export default withStyles(useStyles)(UpdateInsert);