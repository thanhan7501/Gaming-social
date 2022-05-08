import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Avatar, Image, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const PostFrame = (props) => {
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
                            {`${props.post.post.likeCount} likes`}
                        </span>
                    </li>
                    <li style={{ width: '33.3333%' }}>
                        <span>
                            {`${props.post.post.viewCount} views`}
                        </span>
                    </li>
                </ul>
                <ul className="ant-card-actions">
                    <li style={{ width: '100%' }}>
                        <span>
                            <Link to={`/post/${props.post._id}`}>
                                <EditOutlined key="comment" />
                            </Link>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PostFrame