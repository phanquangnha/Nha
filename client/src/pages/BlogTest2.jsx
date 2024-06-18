import { useState, useEffect } from "react";
import { getListAllBlogs, deleteBlog } from "../api";
import { Link } from 'react-router-dom';
import { AiFillTags } from 'react-icons/ai';
import {AiFillClockCircle} from 'react-icons/ai'
import "../css/blog.css"
import {format} from 'timeago.js';

const BlogTest2 = () => {
  const [listBlog, setListBlog] = useState([]);
  useEffect(() => {
    new Promise(async () => {
      await fetchingList();
    });
  }, [])

  const fetchingList = async () => {
    await getListAllBlogs()
      .then((res) => {
        if (res.status === 200) {
          setListBlog(res.data);
        }
      })
      .catch((error) => {});
  };

  return (
    <>
            <section className='blog'>
                <div className="container grid">
                    {listBlog.map((item)=>(
                        <div className='box boxItems' key={item._id}>
                            <div className="img">
                                <img src={item.thumbnail} alt="" />
                            </div>
                            <div className="details">
                                <div className="tag">
                                    <AiFillTags className='icon' />
                                    <a href='/'>#{item.category}</a>
                                </div>
                                <Link to={`/details/${item.id}`} className="link">
                                    <h3>{item.name}</h3>
                                </Link>
                                <p>{item.desc.slice(0,100)} ... </p>
                                <div className="date">
                                    <AiFillClockCircle className='icon'/> <label htmlFor="">{format(item.createdAt)}</label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
    </>
  )
    
    
}

export default BlogTest2;
