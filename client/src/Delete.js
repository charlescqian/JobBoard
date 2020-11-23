/*import React, { Component } from 'react';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField';

class Delete extends Component {
    constructor() {
        super()
        this.state = {
            jobid:'',
        };

    performdelete = this.performdelete.bind(this);

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



    handle({target}) {
        this.setState({
            [target.name]: target.value
        });
    }




    render() {
        return (
            <React.Fragment>
                <Title>Delete</Title>
                <Grid container direction="row" justify="flex-end" spacing={3}>
                    <Grid item xs={3}>
                        <TextField
                            value={this.state.jobid}
                            type='number'
                            onChange={this.handle}/>
                    </Grid>

                    <Grid item xs={3}>
                        <ButtonGroup color="primary" aria-label="contained primary button group" p={0.5}>
                            <Button
                                variant="contained"
                                onClick={this.performdelete}
                            >Perform Delete
                            </Button>
                        </ButtonGroup>
                    </Grid>

        );
    }
}
*/
