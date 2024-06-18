import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { getListAllBlogs, deleteBlog } from "../api";
import { LiaEditSolid } from "react-icons/lia";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import PlusIcon from '@mui/icons-material/Add';
import { CircularProgress, IconButton } from '@mui/material';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 0 auto; /* Center the table horizontally */
  font-family: Arial, sans-serif; /* Choose a suitable font */
  border: 1px solid #ddd;
  text-align: left;
  background-color: #bcbcbc;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  tr:hover {
    background-color: #ddd;
  }
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

const Image = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
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

const AdminBlog = () => {
  const [listBlog, setListBlog] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    new Promise(async () => {
      await fetchingList();
    });
  }, []);

  const fetchingList = async () => {
    await getListAllBlogs()
      .then((res) => {
        if (res.status === 200) {
          setListBlog(res.data);
        }
      })
      .catch((error) => {});
  };

  const removeBlog = async (id) => {
    await deleteBlog(id)
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
    <Container>
    <div className="">
      <div style={{ display: 'flex', justifyContent: 'flex-start', width: '50%' }}>
          <Favorite style={{ marginLeft: '16px' }} onClick={() => {
            navigate(`/blog/add`,{replace: true})
      }}>
            <PlusIcon style={{ width: '16px', height: '16px' }}></PlusIcon>
            </Favorite>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Name Blog</th>
            <th>Category</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listBlog.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                <Image src={item.thumbnail} alt="" />
              </td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.createdAt}</td>
              <td>
                <div className="buttons">
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
                    onClick={() => removeBlog(item._id)}
                  >
                    <BsFillTrash3Fill />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </Container>
  );
};

export default AdminBlog;
