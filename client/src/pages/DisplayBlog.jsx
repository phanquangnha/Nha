import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getBlogByCategory, getMostPopularBlog } from '../api/index.js';
import styled from 'styled-components';
import { PodcastCard } from '../components/PodcastCard.jsx';
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import { displayPodcastFailure } from '../redux/userSlice.jsx';
import { CircularProgress } from '@mui/material';

const DisplayMain = styled.div`
display: flex;
padding: 30px 30px;
flex-direction: column;
height: 100%;
overflow-y: scroll;
`
const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Podcasts = styled.div`
display: flex;
flex-wrap: wrap;
height: 100%;
gap: 10px;
padding: 30px 0px;
`
const Container = styled.div`
background-color: ${({ theme }) => theme.bg};
padding: 20px;
border-radius: 6px;
min-height: 400px;
`

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




const DisplayBlog = () => {
    const { type } = useParams();
    const [blog, setBlog] = useState([]);
    const [string, setString] = useState("");
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false);

    const mostPopular = async () => {
        await getMostPopularBlog()
            .then((res) => {
                setBlog(res.data)
            })
            .catch((err) => {
                dispatch(
                    openSnackbar({
                        message: err.message,
                        severity: "error",
                    })
                );
            });
    }
    const getCategory = async () => {
        await getBlogByCategory(type)
            .then((res) => {
                setBlog(res.data)
            })
            .catch((err) => {
                dispatch(
                    openSnackbar({
                        message: err.message,
                        severity: "error",
                    })
                );
            });

    }

    const getallblog = async () => {
        if (type === 'mostpopular') {
            setLoading(true);
            let arr = type.split("");
            arr[0] = arr[0].toUpperCase();
            arr.splice(4, 0, " ");
            setString(arr.join(""));
            console.log(string);
            await mostPopular();
            setLoading(false);
        }
        else {
            setLoading(true);
            let arr = type.split("");
            arr[0] = arr[0].toUpperCase();
            setString(arr);
            await getCategory();
            setLoading(false);
        }
    }

    useEffect(() => {
        getallblog();

    }, [])
    return (
        <DisplayMain>
            <Container>
                <Topic>{string}</Topic>
                {Loading ? 
                <Loader>
                    <CircularProgress />
                </Loader>
                 :
                    <Podcasts>
                        {blog.length === 0 && <DisplayNo>No Blogs</DisplayNo>}
                        {blog.map((blogs) => (
                            <PodcastCard blogs={blogs} />
                        ))}
                    </Podcasts>
                }
            </Container>
        </DisplayMain>
    )
}

export default DisplayBlog