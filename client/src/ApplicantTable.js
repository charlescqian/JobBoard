import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Button, ButtonGroup, Grid, Checkbox } from '@material-ui/core';



class ApplicantTable extends Component {
    constructor() {
        super();
        this.state = {
            postings: [],
            applicants: [], 
            selected: new Set(),
        };

        this.getPostings = this.getPostings.bind(this);
        this.getApplicants = this.getApplicants.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }   

    getPostings = async daysBack => {
        console.log(daysBack);
        fetch(`/api/postings/${daysBack}`)
        .then(res => {
            if(res.status !== 200) {
              console.log(res.status);
              return [];
            }
            else return res.json();
        })
        .then(res => this.setState({postings: res}))
    }

    getApplicants = async () => {
        console.log(this.state.selected);
        var uri = `/api/applicants/?postingID=`;
        // For loop to append to uri
        this.state.selected.forEach(id => {
            uri += `${id},`;
        })
        uri = uri.slice(0,-1); // Remove the last ','
        console.log(uri);

        fetch(uri)
        .then(res => {
            if(res.status !== 200) {
              console.log(res.status);
              return [];
            }
            else return res.json();
        })
        .then(res => this.setState({applicants: res}))
    }

    handleChange = (event, id) => {
        console.log(id);
        
        if (event.target.checked) {
            // If we selected the item
            this.state.selected.add(id);
        } else {
            // Deselected the item
            this.state.selected.delete(id);
        }
        console.log(this.state.selected)
    }

    render() {
        return (
            <React.Fragment>
                <Title>Job Applicant Table</Title>
                <Grid container direction="row" justify="flex-start" spacing={3}>
                    <Grid item xs={6}>
                        <ButtonGroup color="primary" aria-label="contained primary button group" p={0.5}>
                            <Button variant="contained" onClick={() => this.getPostings(7)}>Last 7 Days</Button>
                            <Button variant="contained" onClick={() => this.getPostings(14)}>Last 14 Days</Button>
                            <Button variant="contained" onClick={() => this.getPostings(30)}>Last 30 Days</Button>
                            <Button variant="contained" onClick={() => this.getPostings(90)}>Last 90 Days</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <ButtonGroup color="primary" aria-label="contained primary button group" p={0.5}>
                            <Button variant="contained" onClick={this.getApplicants}>Search for Selected</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Posting ID</TableCell>
                                    <TableCell>Job Title</TableCell>
                                    <TableCell>Date Posted</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.postings.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <Checkbox color="primary" onChange={(e) => this.handleChange(e, row.id)}/>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>    
                    </Grid>
                    <Grid item xs={6}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Resume</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.applicants.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell><a href={`/resume/${row.resume}`}>{row.resume}</a></TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>  
                    </Grid>
                </Grid>
                
            </React.Fragment>
        );
    }
}


export default ApplicantTable;