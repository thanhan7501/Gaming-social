import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Avatar, Image, Button, Menu, Dropdown, } from 'antd';
import { EditOutlined, LikeOutlined, EllipsisOutlined, DeleteOutlined, LikeTwoTone, FlagOutlined, RetweetOutlined } from '@ant-design/icons';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

import likeApi from '../../api/like';
import postApi from '../../api/post'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'react-toastify/dist/ReactToastify.css';
import "./postComment.scss";

const PostComment = (props) => {
    const [liked, setLiked] = useState(props.post.liked);
    const [likes, setLikes] = useState(props.post.likes);
    const navigate = useNavigate()

    const { userInfor } = useSelector((state) => state.isAuthenticated);
    let { id } = useParams();

    const handleLike = async () => {
        const values = {
            postId: id,
        }
        const response = await likeApi.like(values);
        setLiked(true);
        setLikes(response.likes.likes)
    }

    const handleUnLike = async () => {
        const response = await likeApi.unlike(id);
        setLiked(false);
        setLikes(response.likes.likes)
    }

    const handleDelete = async () => {
        try {
            const response = await postApi.deletePost(id);
            if (response.status === true) {
                toast.success("Delete success!", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
            else {
                toast.error("Error, Delete Failed !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (err) {
            toast.error("Error, Delete Failed !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<FlagOutlined />}>
                Report
            </Menu.Item>
            <Menu.Item key="2" icon={<RetweetOutlined />}>
                Share
            </Menu.Item>
            {(userInfor._id === props.post.post.user._id || userInfor.isAdmin === true) && (
                <Menu.Item key="3" icon={<DeleteOutlined />} onClick={handleDelete}>
                    Delete
                </Menu.Item>
            )}
        </Menu>
    );



    return (
        <div className="dashboard">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="dashboard_user-infor">
                                <div className="user">
                                    <div className="user-avatar">
                                        <Link to={`/profile/${props.post.post.user._id}`} >
                                            <Avatar src={props.post.post.user.avatarUrl} />
                                        </Link>
                                    </div>
                                    <div className="ml-3 user-active d-flex flex-column">
                                        <Link to={`/profile/${props.post.post.user._id}`} >
                                            <span>{props.post.post.user.fullName}</span>
                                        </Link>
                                        <em>{new Date(props.post.post.createdAt).toLocaleString()}</em>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="user-department">
                                {props.post.post.game.gameName && (
                                    <span>{`is playing ${props.post.post.game.gameName}`}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="content">
                        <div className="content-inner">
                            {props.post.post.content}
                        </div>
                        <div className="content-img text-center">
                            <Swiper
                                navigation={true}
                                pagination={true}
                                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                                className="mySwiper"
                            >
                                {props.post.post.postFile && props.post.post.postFile.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <Image src={image} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
                <ul className="ant-card-actions">
                    <li style={{ width: '33.3333%' }}>
                        <span>
                            {`${likes} likes`}
                        </span>
                    </li>
                </ul>
                <ul className="ant-card-actions">
                    <li style={{ width: '33.3333%' }}>
                        <span>
                            {liked === false ? <LikeOutlined onClick={handleLike} /> : <LikeTwoTone onClick={handleUnLike} />}
                        </span>
                    </li>
                    <li style={{ width: '33.3333%' }}>
                        <span>
                            <Link to={`/post/${props.post.post._id}`}>
                                <EditOutlined key="comment" />
                            </Link>
                        </span>
                    </li>
                    <li style={{ width: '33.3333%' }}>
                        <span>
                            <Dropdown overlay={menu}>
                                <EllipsisOutlined />
                            </Dropdown>
                        </span>
                    </li>
                </ul>
            </div>
            <ToastContainer />
        </div>
    )
}

export default PostComment;