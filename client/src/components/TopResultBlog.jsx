import * as React from 'react';
import styled from "styled-components";
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AiFillEye } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";
import { BiSolidUserCircle } from "react-icons/bi";
import { AiFillTags } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getListAllBlogs, deleteBlog } from "../api";

const SearchedCard = styled(Link)`
width: 500px;
display: flex;
flex-direction: column;
padding: 18px 18px 30px 18px;
border-radius: 6px;
gap: 12px;
background-color: ${({ theme }) => theme.card};
box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
cursor: pointer;
text-decoration: none;
&:hover{
  cursor: pointer;
  transform: translateY(-8px);
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
  filter: brightness(1.3);
}
@media (max-width: 768px) {
  width: 290px;
}
`
const PodcastImage = styled.img`
object-fit:cover;
  width: 100%;
  height: 400px;
  border-radius: 6px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.3);
`
const PodcastTitle = styled.div`
color: ${({ theme }) => theme.text_primary};
display: -webkit-box;
  font-size: 24px;
  font-weight: 520;

`
const UploadInfo = styled.div`
display: flex;
width: 80%;
gap: 12px;

`
const Time = styled.div`
color: ${({ theme }) => theme.text_secondary};
font-size: 14px;
@media (max-width: 768px) {
  font-size: 12px;
}
@media (max-width: 560px) {
  font-size: 10px;
}
`
const CreatorName = styled.div`
color: ${({ theme }) => theme.text_primary};
font-size: 14px;
@media (max-width: 768px) {
  font-size: 12px;
}
@media (max-width: 560px) {
  font-size: 10px;
}
`
const Description = styled.div`
color: ${({ theme }) => theme.text_secondary};
display: -webkit-box;
max-width: 100%;
font-size: 14px;
margin-bottom: 1rem;
-webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
const SearchMain = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
overflow-x: hidden;
display: flex;
flex-direction: column;
gap: 20px;
@media (max-width: 768px) {
    padding: 20px 9px;
}

`;

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

const Container = styled.div`
color: ${({ theme }) => theme.text_primary};
padding: .5rem;
box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);

`;


const FilterContainer = styled.div`
color: ${({ theme }) => theme.text_primary};
display: flex;
flex-direction: column;
@media (max-width: 768px){
  padding: 3px 6px;
  display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
}
${({ box, theme }) => box && `
background-color: ${theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`}
background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`;

const Heading = styled.div`
    align-items: flex-start;
    color: ${({ theme }) => theme.text_primary};
    font-size: 22px;
    font-weight: 540;
    margin: 10px 14px;
`;
const BrowseAll = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 14px;
`;
const SearchedCards = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
    padding: 14px;
    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        padding: 6px;
    }
`;
const Categories = styled.div`
    margin: 20px 10px;
`;
const Search_whole = styled.div`
 max-width: 700px;
 display:flex;
 width: 100%;
 border: 1px solid ${({ theme }) => theme.text_secondary};
 border-radius:30px;
 cursor:pointer;
 padding:12px 16px;
 justify-content: flex-start;
 align-items: center;
 gap: 6px;
 color: ${({ theme }) => theme.text_secondary};
 `;
const OtherResults = styled.div`
    display: flex;
    flex-direction: column;
    height: 700px;
    overflow-y: scroll;
    overflow-x: hidden;
    gap: 6px;
    padding: 4px 4px;
    @media (max-width: 768px) {
        height: 100%;
        padding: 4px 0px;
    }
`;

const Loader = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`
const DisplayNo = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
color: ${({ theme }) => theme.text_primary};
`
const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  margin-top: -0.8rem;
  margin-bottom: 1rem;
  padding-left : 3px;
  font-size: 18px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @maedia (max-width: 768px){
    font-size: 18px;
  }
`;
const Span = styled.span`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  @media (max-width: 768px){
    font-size: 14px;
  }
  color: ${({ theme }) => theme.primary};
  &:hover{
    transition: 0.2s ease-in-out;
  }
  `;

const Podcasts = styled.div`
display: flex;
flex-wrap: wrap;
gap: 14px;
padding: 18px 6px;
//center the items if only one item present
@media (max-width: 550px){
  justify-content: center;
}
`;

const BlogLayout = styled.div`
background-color: ${({ theme }) => theme.bgLight};
border-radius: 10px;
display: flex;
gap: 14px;
padding-top: 10px ;
padding-left: 10px;
padding-right: 10px;
@media (max-width: 768px){
  padding: 3px 7px;
  display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
}
@media (max-width: 550px){
  display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
}
`;

const CardImage = styled.img`
  object-fit: cover;
  width: 220px;
  height: 140px;
  border-radius: 6px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  &:hover{
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  }
`

const Title = styled.div`
  overflow: hidden;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_primary};
`

const MainInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction:column;
  justify-content: flex-start;
  gap: 4px;
  `
const Date = styled.div`
  font-size:12px;
  color: ${({ theme }) => theme.text_secondary};
  width: max-content;
`
const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 6px;

  `;

const Card = styled.div`
padding: 4px 10px;
align-items: center;
text-align: center;
background: rgb(141, 140, 140);
border-radius: 13px;
color: white;
&:hover{
  cursor: pointer;
  transform: translateY(-8px);
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
  filter: brightness(1.3);
}
@media (max-width: 768px) {
  width: 75px;
}
`

const DefaultCardText = styled.div`
  color: ${({ theme }) => theme.text_primary};
display: flex;
margin: .3rem 0;
font-size:12px;
font-weight:600;
&:hover{
  cursor: pointer;
  transform: translateY(-5px);
  transition: all 0.4s ease-in-out;
}

`

const TopResultBlog = ({ podcast }) => {
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
      .catch((error) => { });
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
    <Container>
      <section className='blog'>
        <Topic>Popular Blogs
          <Link to={`/blog/all`} style={{ textDecoration: "none" }}>
            <Span>Show All</Span>
          </Link>
        </Topic>
        <div className="container grid2">
          {listBlog.slice(0, 10).map((item) => (
            <div className='box boxItems' key={item._id}>
              <BlogLayout>
                <div className='img-title'>
                  <CardImage src={item.thumbnail} alt="" style={{ width: '180px', height: '200px' }} />
                </div>

                <div className="details">

                  <DefaultCardText>
                    <Link to={`/blog/${item.category}`}><AiFillTags />{item.category}</Link>
                  </DefaultCardText>


                  <Link to={`/details/blog/${item._id}`} className="link">
                    <Title>{item.name.slice(0, 80)}</Title>
                  </Link>
                  <Description>
                    <div style={{ width: '100%', minHeight: 50 }} dangerouslySetInnerHTML={{ __html: item.desc.slice(0, 175) }} />
                    ... <Link to={`/details/blog/${item._id}`}>read more</Link>
                    </Description>
                    <div>
                      
                        <Date><AiFillClockCircle></AiFillClockCircle>{format(item.createdAt)}</Date>
                      

                    </div>
                 
                </div>
              </BlogLayout>


            </div>
          ))}
        </div>
      </section>
    </Container>

  );
}

export default TopResultBlog;