import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import { requestURL } from "./ReqUrl";

const InsBankRqst = (props) => {
  const navigate = useNavigate();
  // const params = useParams();

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Institute Name</TableCell>
            <TableCell align="right">Bank A/C Holder Name</TableCell>
            <TableCell align="right">Bank A/C Number</TableCell>
            <TableCell align="right">Bank IFSC Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.requestData && props.requestData.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={`/admin/insprofile/${row._id}`}>
              <img
                  className={styles.insUserProfiles}
                    src={
                      row.photoId === "1"
                        ? "/images/institute-avatar.jpeg"
                        : `${requestURL}/insprofileabout/photo/${row.insProfilePhoto}`
                    }
                  />
                </Link> {` ${row.insName}`}
              </TableCell>
              <TableCell align="right">{row.bankAccountHolderName}</TableCell>
              <TableCell align="right">{`${row.bankAccountNumber}`}</TableCell>
              <TableCell align="right">{row.bankIfscCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </>
  );
};

export default InsBankRqst;

