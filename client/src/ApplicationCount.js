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

class ApplicationCount extends Component {
    constructor() {
        super();
        this.state = {
            postings: [],
            threshold: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.getData = this.getData.bind(this);
    }   


    handleChange({target}) {
        this.setState({
          [target.name]: target.value
        });
    }

    getData = async () => {
        console.log(this.state.threshold);
        fetch(`/api/applicationCount/${this.state.threshold}`)
        .then(res => {
            if(res.status !== 200) {
              console.log(res.status);
              return [];
            }
            else return res.json();
        })
        .then(res => this.setState({postings: res}))
    }

    render() {
        return (
            <React.Fragment>
                <Title># of Applications per Open Posting</Title>
                <Grid container direction="row" justify="flex-end" spacing={3}>
                <Grid item xs={3}>
                    <TextField 
                    id="threshold" 
                    name="threshold"
                    label="Min. # of Apps" 
                    value={this.state.threshold}
                    type='number'
                    onChange={this.handleChange}/>
                </Grid>
                <Grid item xs={3}>
                    <Button 
                    variant="contained" 
                    onClick={this.getData}
                    >Search</Button>
                </Grid>
                </Grid>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Posting ID</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Date Posted</TableCell>
                            <TableCell># of Applications</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.postings.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.count}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(ApplicationCount);