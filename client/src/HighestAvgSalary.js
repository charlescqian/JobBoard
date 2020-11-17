import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Button, Grid, ButtonGroup} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
}));

class HighestAvgSalary extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
        };

        this.getData = this.getData.bind(this);
    }   

    getData = async () => {
        console.log(this.state.threshold);
        fetch(`/api/highestAvgSalary/`)
        .then(res => {
            if(res.status !== 200) {
              console.log(res.status);
              return [];
            }
            else return res.json();
        })
        .then(res => this.setState({data: res}))
    }

    render() {
        return (
            <React.Fragment>
                <Title>Company with Highest Avg Salary</Title>
                <Grid container direction="row" justify="flex-start" spacing={3}>
                    <Grid item xs={3}>
                        <ButtonGroup color="primary" aria-label="contained primary button group" p={0.5}>
                            <Button 
                            variant="contained" 
                            onClick={this.getData}
                            >Search</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Company Name</TableCell>
                            <TableCell>Avg Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.companyName}</TableCell>
                            <TableCell>{`$${row.avgSalary}`}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(HighestAvgSalary);