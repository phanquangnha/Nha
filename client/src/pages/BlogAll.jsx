import styled from "styled-components";
import { useState, useEffect } from "react";
import { getListAllBlogs, deleteBlog } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import { CircularProgress, IconButton } from '@mui/material';
import Favorite from "@mui/icons-material/Favorite";
import { Link } from 'react-router-dom';
import { AiFillTags } from 'react-icons/ai';
import {AiFillClockCircle} from 'react-icons/ai'
import Avatar from '@mui/material/Avatar';
import { format } from "timeago.js";
import { searchPodcast } from '../api/index.js';
import { useSelector } from 'react-redux';
import { getUsers } from '../api/index';


const DashboardMain = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 20px;
@media (max-width: 768px){
  padding: 6px 10px;
}
${({ box, theme }) => box && `
background-color: ${theme.bg};
  padding: 20px 30px;
`}
background-color: ${({ theme }) => theme.bg};
  padding: 20px 30px;

`;

const Loader = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`
const BlogAll = () => {
  const [listBlog, setListBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    new Promise(async () => {
      await fetchingList();
    });
  }, []);
  // user
  const { currentUser } = useSelector(state => state.user);

  // const token = localStorage.getItem("podstreamtoken");
  // const getUser = async () => {
  //   await getUsers(token).then((res) => {
  //     setUser(res.data)
  //   }).then((error) => {
  //     console.log(error)
  //   });
  // }

  const getallData = async () => {
    setLoading(true);
    if (currentUser) {
      setLoading(true);
    }
    await fetchingList();
    setLoading(false);
  }

  useEffect(() => {
    getallData();
  }, [currentUser]) 

    // const handleChange = async (e) => {
    //     setSearchedPodcasts([]);
    //     setLoading(true);
    //     setSearched(e.target.value);
    //     await searchPodcast(e.target.value)
    //         .then((res) => {
    //             setSearchedPodcasts(res.data);
    //             console.log(res.data);
    //         })
    //         .catch((err) => {
    //             dispatch(
    //                 openSnackbar({
    //                     message: err.message,
    //                     severity: "error",
    //                 })
    //             );
    //         });
    //     setLoading(false);
    // }

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
    <>
       <DashboardMain> 
       {loading ?
        <Loader>
          <CircularProgress />
        </Loader>
        :
        <div>
            <section className='blog'>
                <div className="container grid">
                    {listBlog.map((item)=>(
                        <div className='box boxItems' key={item._id}>
                            <div className="img">
                                <img src={item.thumbnail} alt="" />
                            </div>
                            <div className="details">
                                <div className="tag">
                                    {/* <AiFillTags className='icon' /> */}
                                    <a href='/'>#{item.category}</a>
                                </div>
                                <Link to={`/details/${item.id}`} className="link">
                                    <h3>{item.name}</h3>
                                </Link>
                                <p>{item.desc.slice(0,100)} ... </p>
                                <div className="date">
                                    <AiFillClockCircle className='icon'/> <label htmlFor="">{format(item.createdAt)}</label>
                                    {/* <AiOutlineComment className='icon'/> <label htmlFor="">{item.comment}</label>
                                    <AiOutlineShareAlt className='icon'/> <label htmlFor="">Share</label> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            </div>
}
        </DashboardMain>
    </>
  )
    
    
}

export default BlogAll;
