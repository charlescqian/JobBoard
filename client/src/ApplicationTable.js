import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import TextField from '@material-ui/core/TextField';

// Generate Application Data 
function createData(id, date, name, email, resume) {
  return { id, date, name, email, resume};
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'shazow@comcast.net', 'EPresleyCV.pdf'),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'ehood@optonline.net', 'Paul_McCartnery_Resume.pdf'),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'blixem@msn.com', 'Tom-S-Resume.pdf'),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'emcleod@me.com', 'Micahel-Jackson-Resume-2020.pdf'),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'esasaki@live.com', 'BSpringsteenResume.pdf'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ApplicationTable() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Applications</Title>
      <TextField id="posting" label="Posting"/>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Resume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell><a href={`/resume/${row.resume}`}>{row.resume}</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
