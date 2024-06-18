import "./podcastadmin.css";
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
import { getPodcasts, deletePostCard } from "../../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/snackbarSlice";
import PlusIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import {format} from 'timeago.js';

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

const Favorite = styled(IconButton)`
  color:white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  border: 1px solid;
  background: ${({ theme }) => theme.text_secondary + 95} !important;
  color: ${({ theme }) => theme.text_primary} !important;
`

const PodcastAdmin = () => {
const [listPod, setListPod] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    new Promise(async () => {
      await fetchingList();
    });
   
  },
  
  []);

  const fetchingList = async () => {
    await getPodcasts()
      .then((res) => {
        if (res.status === 200) {
          setListPod(res.data);
        }
      })
      .catch((error) => {});
  };

  const deletePostcard = async (idPostcard) => {
    await deletePostCard(idPostcard)
      .then((res) => {
        openSnackbar({
          message: "Delete Success",
          severity: "success",
        });
        fetchingList();
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: "Delete Error",
            severity: "error",
          })
        );
      });
  };

  return (

    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Images</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Category</TableCell>
            <TableCell className="tableCell">Type</TableCell>
            <TableCell className="tableCell">Episodes</TableCell>
            <TableCell className="tableCell">Date Created</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        {listPod.map((item, index) => (
        <TableBody key={item._id}>
            <TableRow>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell"><Image src={item.thumbnail} alt="" /></TableCell>
                <TableCell className="tableCell">{item.name}</TableCell>
                <TableCell className="tableCell">{item.category}</TableCell>
                <TableCell className="tableCell">{item.type}</TableCell>
                <TableCell className="tableCell">{item?.episodes.length}</TableCell>
                <TableCell className="tableCell">{format(item.createdAt)}</TableCell>
                <TableCell className="tableCell"><div className="buttons">
                  <button
                    className="button"
                    onClick={() => {
                      navigate(`/blog/update/${item.category}/${item._id}`, {
                        replace: true,
                      });
                    }}
                  >
                    <LiaEditSolid />
                  </button>
                  <button
                    className="button"
                    onClick={() => deletePostcard(item._id)}
                  >
                    <BsFillTrash3Fill />
                  </button>
                </div></TableCell>
                </TableRow>
        </TableBody>
        ))}
      </Table>
    </TableContainer>
  );
};


export default PodcastAdmin;
