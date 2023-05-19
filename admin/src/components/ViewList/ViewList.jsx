import "./ViewList.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllTheater } from "../../utils/Constants";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";
import { Link } from "react-router-dom";
const TheaterTable = () => {
  const [info, setInfo] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState({});
  useEffect(() => {
    heelo();
  }, [heelo]);

  var heelo = useCallback(
    () => {
    axios.get('http://localhost:1000/api/admin/getAllTheater').then((response) => {
      setInfo(response.data);
    });
  }
   );


  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell className="tableCell">NO</TableCell>
            <TableCell className="tableCell">Owner</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">PLACE</TableCell>
            <TableCell className="tableCell">STATE</TableCell>
            <TableCell className="tableCell">CITY</TableCell>
            <TableCell className="tableCell">DISCRIPTION</TableCell>
         
           
          </TableRow>
        </TableHead>
        <TableBody>
          {info.map((info,index) => (
            <TableRow key={info.id}>
               <TableCell className="tableCell">{index +1}</TableCell>
              <TableCell className="tableCell">{info.Name}</TableCell>
              <TableCell className="tableCell">{info.application.theatername}</TableCell>
              <TableCell className="tableCell">{info.application.place}</TableCell>
              <TableCell className="tableCell">{info.application.state}</TableCell>
              <TableCell className="tableCell">{info.application.city}</TableCell>
              <TableCell className="tableCell">{info.application.discription}</TableCell>
          
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TheaterTable;
