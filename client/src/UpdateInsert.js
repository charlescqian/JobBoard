import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
        fetch(`/api/update/${this.state.jobType}/${this.state.jobIndustry}/${this.state.jobSalary}/${this.state.jobid}/${this.state.jobTitle}/`)
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
        fetch(`/api/insert/${this.state.jobType}/${this.state.jobIndustry}/${this.state.jobSalary}/${this.state.jobid}/${this.state.jobTitle}/`)
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
                        </ButtonGroup>
                        <ButtonGroup color = "primary" aria-label = "contained primary button group" p = {0.5}>
                        <Button
                                variant="contained"
                                onClick={this.performInsert}
                            >Insert
                            </Button>
                            </ButtonGroup>
                    </Grid>
                </Grid>
                <Grid container direction="column" justify="flex-end" spacing={1}>
                    <Grid item xs={9}>
                        <TextField
                            name='jobType'
                            value={this.state.jobType}
                            type='text'
                            label='Job Type'
                            onChange={this.handleTextChange} />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            name='jobIndustry'
                            value={this.state.jobIndustry}
                            type='text'
                            label='Job Industry'
                            onChange={this.handleTextChange} />
                            </Grid>
                    <Grid item xs={9}>
                        <TextField
                            name='jobSalary'
                            value={this.state.jobSalary}
                            type='number'
                            label='Job Salary'
                            onChange={this.handleTextChange} />
                            </Grid>
                    <Grid item xs={9}>
                        <TextField
                            name='jobTitle'
                            value={this.state.jobTitle}
                            type='text'
                            label='Job Title'
                            onChange={this.handleTextChange} />
                            </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}
export default withStyles(useStyles)(UpdateInsert);