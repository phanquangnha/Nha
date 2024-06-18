import styled from "styled-components";
import { useState, useEffect } from "react";
import { getListAllBlogs, deleteBlog } from "../api";
import { LiaEditSolid } from "react-icons/lia";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import PlusIcon from '@mui/icons-material/Add';
import { CircularProgress, IconButton } from '@mui/material';
import Favorite from "@mui/icons-material/Favorite";
import { Link } from 'react-router-dom';
import { AiFillTags } from 'react-icons/ai';
import {AiFillClockCircle} from 'react-icons/ai'
import MoreResult from "../components/MoreResult";
import Avatar from '@mui/material/Avatar';
import { format } from "timeago.js";
import { searchPodcast } from '../api/index.js';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { CategoryBlog } from '../utils/Data.js';
import { TypeBlog } from '../components/TypeBlog.jsx';
import TopResult from '../components/TopResult.jsx';
import { useSelector } from 'react-redux';
import { getUsers } from '../api/index';
import TopResultBlog from '../components/TopResultBlog.jsx';
import MoreResultBlog from '../components/MoreResultBlog.jsx';
import { Container, Row, Col} from "reactstrap";

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

const SpanButton = styled.span`
  color: ${({ theme }) => theme.text_secondary};
  border: 1px dotted grey;
  border-radius: 4px;
  padding: 5px 16px;
  font-size: 13px;
  font-weight: 200;
  cursor: pointer;
  @media (max-width: 768px){
    font-size: 14px;
  }
  &:hover{
    transition: 0.2s ease-in-out;
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
${({ box, theme }) => box && `
background-color: ${theme.bg};
  padding: 20px 30px;
`}
background-color: ${({ theme }) => theme.bg};
  padding: 20px 30px;

`;

const FilterContainer = styled.div`
display: flex;
flex-direction: column;
${({ box, theme }) => box && `
background-color: ${theme.bg};
  padding: 20px 30px;
`}
background-color: ${({ theme }) => theme.bg};
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
    width: 550px;
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
  font-size: 24px;
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
  font-size: 16px;
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
color: ${({ theme }) => theme.text_primary};
display: flex;
gap: 14px;
padding-top: 5px ;
padding-left: 5px;
padding-right: 5px;
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

const Description = styled.div`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  margin-bottom: 10px;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
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

  `
const CreatorName = styled.div`
  font-size:12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
`;

const ContainerTest = styled.div`
  display: flex; 
  color: ${({ theme }) => theme.text_secondary};
`;
const ContainerTop = styled.div`
  flex: 8;
  color: ${({ theme }) => theme.text_secondary};
`;
const ContainerOther = styled.div`
  flex: 3;
  margin: 0 2rem;
  color: ${({ theme }) => theme.text_secondary};
`;



const BlogAll = () => {
  const [listBlog, setListBlog] = useState([]);
  const [searched, setSearched] = useState("");
  const [user, setUser] = useState();
  const [searchedPodcasts, setSearchedPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    new Promise(async () => {
      await fetchingList();
    });
  }, []);


    const handleChange = async (e) => {
        setSearchedPodcasts([]);
        setLoading(true);
        setSearched(e.target.value);
        await searchPodcast(e.target.value)
            .then((res) => {
                setSearchedPodcasts(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                dispatch(
                    openSnackbar({
                        message: err.message,
                        severity: "error",
                    })
                );
            });
        setLoading(false);
    }

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
    <DashboardMain> 
      {loading ?
      <loader>
        <CircularProgress/>
      </loader>
      :
      <>
      <FilterContainer>
    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Search_whole>
                <SearchOutlinedIcon sx={{ "color": "inherit" }} />
                <input type='text' placeholder='Search Blogs'
                    style={{ "border": "none", "outline": "none", "width": "100%", "background": "inherit", "color": "inherit" }}
                    value={searched}
                    onChange={(e) => handleChange(e)} />
            </Search_whole>
    </div>
    {searched === "" ?
                <Categories>
                    <BrowseAll>
                    <div className="tag">
                                    {/* <AiFillTags />Tags:  */}
                                </div>
                        {CategoryBlog.map((category) => (
                            <Link to={`/blog/${category.name.toLowerCase()}`} style={{ textDecoration: "none" }}>
                                <TypeBlog category={category} />
                            </Link>
                        ))}
                    </BrowseAll>
                </Categories>
                :
                <>
                    {loading ?
                        <Loader>
                            <CircularProgress />
                        </Loader>
                        :
                        <SearchedCards>
                            {searchedPodcasts.length === 0 ?
                                <DisplayNo>No Podcasts Found</DisplayNo>
                                :
                                <>
                                    <TopResult podcast={searchedPodcasts[0]} />
                                    <OtherResults>
                                        {searchedPodcasts.map((podcast) => (
                                            <MoreResult podcast={podcast} />
                                        ))}
                                    </OtherResults>
                                </>
                            }
                        </SearchedCards>
                    }
                </>
            }
    






            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '97%' , marginBottom: '5px'}}>
          <SpanButton style={{ marginLeft: '16px' }} onClick={() => {
            navigate(`/blog/add`,{replace: true})
      }}> Add
            </SpanButton>
      </div>
      
              
         


  {/* 
   */}
  
  <ContainerTest> 
  <ContainerTop> 
      <TopResultBlog/>
  </ContainerTop> 
      <ContainerOther>
    
        <MoreResultBlog/>
      </ContainerOther> 
    </ContainerTest>



            </FilterContainer>

            
            </>
}
        </DashboardMain>
  )
}

export default BlogAll;
