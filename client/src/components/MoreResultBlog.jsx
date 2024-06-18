import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {format} from 'timeago.js';
import { AiFillEye } from "react-icons/ai";
import {AiFillClockCircle } from "react-icons/ai";
import { getListAllBlogs, deleteBlog } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {BsFacebook} from "react-icons/bs";
import {AiFillTwitterCircle} from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { CircularProgress } from '@mui/material';


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
`;

const FilterContainer = styled.div`
color: ${({ theme }) => theme.text_primary};
padding-bottom: 1rem;

${({ box, theme }) => box && `
background-color: ${theme.bg};

`}
background-color: ${({ theme }) => theme.bg};
`;

const Container = styled.div`
color: ${({ theme }) => theme.text_primary};
padding: .5rem;
box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
`;

const Results = styled(Link)`
background-color: ${({ theme }) => theme.bgLight};
display: flex;
align-items: center;
padding: 8px;
margin: .5rem 0;
border-radius: 6px;
gap: 20px;
&:hover{
    cursor: pointer;
    transform: translateY(-8px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
`
const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  margin: 0.9rem 0;
  font-size: 14px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @maedia (max-width: 768px){
    font-size: 10px;
  }
`;

const PodcastImage = styled.img`
height: 100%;
border-radius: 5px;
width: 100%;

object-fit: cover;
@media (max-width: 768px) {
  height: 50px;
  width: 80px;
}
`
const PodcastInfo = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
`
const PodcastName = styled.div`
font-size: 13px;
display: flex;
flex-direction: column;
color: ${({ theme }) => theme.text_primary};
`
const Creator = styled.div`
color: ${({ theme }) => theme.text_secondary};
font-size: 10px;
@media (max-width: 768px) {
  font-size: 8px;
}

`
const Time = styled.div`
color: ${({ theme }) => theme.text_secondary};
font-size: 10px;
width: 50px;
@media (max-width: 768px) {
  font-size: 10px;
}
`
const Desciption = styled.div`
display: flex;
gap: 8px;
`
const Loader = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`
const CardImage = styled.img`
  object-fit: cover;
  width: 75px;
  height: 55px;
  border-radius: 4px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  &:hover{
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  }
`

const MoreResultBlog = ()=> {
  const [listBlog, setListBlog] = useState([]);
//   const [searched, setSearched] = useState("");
//   const [user, setUser] = useState();
//   const [searchedPodcasts, setSearchedPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    new Promise(async () => {
      await fetchingList();
    });
  }, []);


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

//   const removeBlog = async (id) => {
//     await deleteBlog(id)
//       .then((res) => {
//         openSnackbar({
//           message: "Delete Success",
//           severity: "success",
//         });
//         fetchingList();
//       })
//       .catch((err) => {
//         dispatch(
//           openSnackbar({
//             message: "Delete Error",
//             severity: "error",
//           })
//         );
//       });
//   };
  return (
    <>
    {loading ?
      <loader>
        <CircularProgress/>
      </loader>
      :
      <>
      <Container>
      
      <Topic>Featured Posts</Topic>
      <FilterContainer>
      
      {listBlog.slice(10,15).map((item)=>(
        <div className='box boxItems' key={item._id}>
      <Results to={`/details/blog/${item._id}`} style={{ textDecoration: "none" }}>
        <div className='img-title'>
        <CardImage src={item.thumbnail} />
        </div>
        <PodcastInfo>
          <PodcastName>{item.name.slice(0,30)}...</PodcastName>
          <Desciption>
            <Time>
              <AiFillEye/> {item.views} Views
            </Time>
            <Time style={{width: "90px"}}>
              <AiFillClockCircle/> {format(item.createdAt)}
            </Time>
          </Desciption>
        </PodcastInfo>
      </Results>
      </div>
    ))}
    </FilterContainer>
  
    {/* <Topic>Tags</Topic>
    <div className="tag">
                                      <AiFillTags />Tags: 
                                  </div>
                          {CategoryBlog.map((category) => (
                              <Link to={`/blog/${category.name.toLowerCase()}`} style={{ textDecoration: "none", display: "flex", width: "80px" }}>
                                  <TypeBlog category={category} />
                              </Link>
                          ))} */}
  
  <Topic>Latest Posts</Topic>
      <FilterContainer>
      {listBlog.slice(0,5).map((item)=>(
        <div className='box boxItems' key={item._id}>
      <Results to={`/details/blog/${item._id}`} style={{ textDecoration: "none" }}>
        <div className='img-title'>
        <CardImage src={item.thumbnail} />
        </div>
        <PodcastInfo>
          <PodcastName>{item.name.slice(0,30)}...</PodcastName>
          <Desciption>
            <Time>
              <AiFillEye/> {item.views} Views
            </Time>
            <Time style={{width: "90px"}}>
              <AiFillClockCircle/> {format(item.createdAt)}
            </Time>
          </Desciption>
        </PodcastInfo>
      </Results>
      </div>
    ))}
    </FilterContainer>
  
    <Topic>Follow us</Topic>
    <FilterContainer>
    <AiFillTwitterCircle className='icon-social'/> <BsFacebook className='icon-social'/>  <AiFillGithub className='icon-social'/>
    </FilterContainer>
    </Container>
      </>
    }
    </>
)}

export default MoreResultBlog;