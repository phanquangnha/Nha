import "./useradmin.css";
import react,{useState,useEffect} from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import TableCol from "mui/material/TableCol"
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LiaEditSolid } from "react-icons/lia";
import { BsFillTrash3Fill } from "react-icons/bs";
import styled from "@emotion/styled";
import { getListUser } from "../../api";

const Image = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
`;
const Container = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 20px;
`;

const UserAdmin = () => {
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        new Promise(async () => {
            await fetchingList();
        })
    },[])

    const fetchingList = async() => {
        await getListUser().then((res) => {
            if (res.status === 200) {
                setListUser(res.data);
            }
        }).catch((error) => {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        })
    }
  return (

    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Phone</TableCell>
            <TableCell className="tableCell">Country</TableCell>
            <TableCell className="tableCell">Role</TableCell>
          </TableRow>
        </TableHead>
        {listUser.map((item) => (
        <TableBody key={item._id}>
            <TableRow>
                <TableCell className="tableCell">{item.name}</TableCell>
                <TableCell className="tableCell">{item.email}</TableCell>
                <TableCell className="tableCell">{item.phone}</TableCell>
                <TableCell className="tableCell">{item.county}</TableCell>
                <TableCell className="tableCell">{item.role}</TableCell>
                </TableRow>
        </TableBody>
        ))}
      </Table>
    </TableContainer>

  );
};

export default UserAdmin;
