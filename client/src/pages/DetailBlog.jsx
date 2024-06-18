import React, { useEffect, useState } from "react";
import "../../src/css/details.css";
import { blog } from "../utils/Data";
import { useNavigate, useParams } from "react-router-dom";
import { LiaEditSolid } from "react-icons/lia";
import { BsFillTrash3Fill } from "react-icons/bs";
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { getDetailBlog, deleteBlog, addComment, getCommentForBlog } from "../api";
import { IconButton } from '@mui/material';
import { openSnackbar } from "../redux/snackbarSlice";
import Feedback from "../components/Feedback/Feedback";
import { getDate } from "../utils/Utils";
import { format } from "timeago.js";
import { CiShare2 } from "react-icons/ci";


const ButtonPost = styled.button`
  margin-top: 20px;
  width: 70px;
  float: right;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  outline: none;
  padding: 8px 0px;
  color: ${({ theme }) => theme.text_secondary};
  &:hover {
    background-color: gray; /* Add a hover effect */
  }
  &:active {
    background-color: blueviolet; /* Add an active effect */
  }
`;
const Desc = styled.textarea`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  padding: 10px 0px;
  color: ${({ theme }) => theme.text_secondary};
`;


const OutlinedBox = styled.div`
  min-height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.text_secondary};
  ${({ googleButton, theme }) =>
    googleButton &&
    `
  user-select: none; 
  gap: 16px;`}
  ${({ button, theme }) =>
    button &&
    `
  user-select: none; 
  border: none;
    font-weight: 600;
    font-size: 16px;
    background: ${theme.button};
    color:'${theme.bg}';`}
    ${({ activeButton, theme }) =>
    activeButton &&
    `
    user-select: none; 
  border: none;
    background: ${theme.primary};
    color: white;`}
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
`;

const DashboardMain = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ box, theme }) =>
    box &&
    `
background-color: ${theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`}
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @maedia (max-width: 768px) {
    font-size: 18px;
  }
`;

const Podcasts = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 18px 6px;
  //center the items if only one item present
  @media (max-width: 550px) {
    justify-content: center;
  }
`;

const Favorite = styled(IconButton)`
  color:white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.text_secondary + 95} !important;
  color: ${({ theme }) => theme.text_primary} !important;
`


export const DetailBlog = () => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [blogs, setBlogs] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      new Promise(async () => {
        await fetching(id);
      })
      fetchListComment(id);
    }
  }, [id])

  const fetching = async (id) => {
    await getDetailBlog(id).then((res) => {
      if (res.status === 200) {
        setBlogs(res.data);
      }
    }).catch((error) => {

    })
  }

  const removeBlog = async (id) => {
    await deleteBlog(id).then((res) => {
      openSnackbar(
        {
          message: 'Delete Success',
          severity: "success"
        }
      );
      navigate('/blog/all', { replace: true })
    }).catch((err) => {
      dispatch(
        openSnackbar(
          {
            message: 'Delete Error',
            severity: "error"
          }
        )
      )
    })
  }

  const [dataFeedback, setDataFeedback] = useState([]);
  const [inputComment, setInputComment] = useState('');

  async function fetchListComment() {
    await getCommentForBlog(id).then((res) => {
      if (res.status === 200) {
        setDataFeedback(res.data);
      }
    }).catch((error) => { })
  }
  async function handleSubmitComment() {
    if (inputComment !== '') {
      const bodyComment = {
        user_id: currentUser?._id,
        blogId: id,
        comment: inputComment,
      }
      await addComment(bodyComment).then((res) => {
        if (res.status === 201) {
          fetchListComment();
          setInputComment('');
        }
      }).catch((error) => { })
    }
    else {

    }
  }
  const renderFeedBack = () => {
    return (
      <>
        {dataFeedback?.map((item, index) => (
          <Feedback
            key={index}
            avatar={item?.creator?.img}
            userName={item?.creator?.name}
            comment={item?.comment}
            date={getDate(item?.createdAt)}
          />
        ))}
      </>
    )
  };
  return (
    <DashboardMain>

      <FilterContainer>
        {blogs ? (
          <>
            <section className="singlePage"  >
              
                <div className="right" >
                <img src={blogs.thumbnail} alt="" style={{ width :'100%' }}/>
                <div className="containerDate">
                  <div className="date ">
                    <AiFillClockCircle className="icon" />{" "}
                    <label htmlFor="">{format(blogs.createdAt)}</label>
                    {/* <AiOutlineComment className="icon" />{" "}
                  <label htmlFor="">{blogs.comment}</label>
                  <AiOutlineShareAlt className="icon" />{" "}
                  <label htmlFor="">Share</label> */}
                  </div>
                  <div className="buttons">
                    <button className="button" onClick={() => navigate(`/blog/update/${blogs.category}/${blogs._id}`)}>
                      <LiaEditSolid />
                    </button>
                    <button className="button" onClick={() => removeBlog(blogs._id)}>
                      <BsFillTrash3Fill />
                    </button>
                    <button className="button">
                      <CiShare2/>
                    </button>
                  </div>
                  </div>
                  <h1 className="tiltleBlog">{blogs.name}</h1>
                  {/* <p>{blogs.desc}</p> */}
                  <div style={{ width: '100%', minHeight: 300 }} dangerouslySetInnerHTML={{ __html: blogs.desc }} />

                </div>
            

            </section>
            <section className="singlePage"  >
            <h3>{'Comment'}</h3>
            <OutlinedBox style={{ marginTop: "6px" }}>
              <Desc
                placeholder="Enter your comment"
                name="desc"
                rows={3}
                value={inputComment}
                onChange={(e) => setInputComment(e.target.value)}
              />
            </OutlinedBox>
            <div style={{width: '100%'}}>
              <ButtonPost onClick={handleSubmitComment}>
                Post
              </ButtonPost>
            </div>
            <div style={{ marginTop: 70 }}>
              {renderFeedBack()}
            </div>
            </section>
          </>
        ) : null}
      </FilterContainer>
    </DashboardMain>
  );
};

export default DetailBlog;
