import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Button, TextField, Grid, ButtonGroup} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

class Delete extends Component {
    constructor() {
        super()
        this.state = {
            jobid:'',
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.performdelete = this.performdelete.bind(this);
    }

    handleTextChange (e) {
        this.setState({ [e.target.name] : e.target.value});
    }

    performdelete = async () => {
        console.log(this.state.jobid);
        fetch(`/api/delete/${this.state.jobid}`)
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
                <Title>Delete</Title>
                <Grid container direction="row" justify="flex-end" spacing={3}>
                    <Grid item xs={3}>
                        <TextField
                            name='jobid'
                            value={this.state.jobid}
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

            </React.Fragment>
             );
        }
    }

export default withStyles(useStyles)(Delete);
