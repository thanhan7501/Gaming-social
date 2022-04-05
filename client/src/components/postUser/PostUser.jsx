import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Avatar, Image, Button } from 'antd';
import { EditOutlined, LikeOutlined, EllipsisOutlined, LikeTwoTone } from '@ant-design/icons';
import { Link } from "react-router-dom";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const PostUser = (props) => {
    const [liked, setLiked] = useState();
    useEffect(() => {
        setLiked(props.post.liked)
    })

    const handleLike = () => {
        setLiked(true);
        console.log('liked')
    }

    const handleUnLike = () => {
        setLiked(false);
        console.log('disliked')
    }

    return (
        <div className="dashboard">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="dashboard_user-infor">
                                <div className="user">

                                    <div className="user-avatar">
                                        <Link to={`/user/${props.post.user._id}`} >
                                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                                        </Link>
                                    </div>
                                    <div className="ml-3 user-active d-flex flex-column">

                                        <span>{props.post.user.fullName}</span>
                                        <em>{props.post.createdAt}</em>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="user-department">
                                <span>{`is playing ${props.post.game.gameName}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="content">
                        <div className="content-inner">
                            {props.post.content}
                        </div>
                        <div className="content-img text-center">
                            <Swiper
                                navigation={true}
                                pagination={true}
                                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                                className="mySwiper"
                            >
                                {props.post.postFile && props.post.postFile.map((image, index) => (
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
                            {liked === false ? <LikeOutlined onClick={handleLike}/> : <LikeTwoTone onClick={handleUnLike}/>}
                        </span>
                    </li>
                    <li style={{ width: '33.3333%' }}>
                        <span>
                            <Link to={`/post/${props.post._id}`}>
                                <EditOutlined key="comment" />
                            </Link>
                        </span>
                    </li>
                    <li style={{ width: '33.3333%' }}>
                        <span>
                            <EllipsisOutlined />
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PostUser;