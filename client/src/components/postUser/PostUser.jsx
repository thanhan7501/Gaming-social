import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const PostUser = (props) => {
    return (
        <div className="dashboard">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="dashboard_user-infor">
                                <div className="user">

                                    <div className="user-avatar">
                                        <img src={props} alt="" />
                                    </div>
                                    <div className="ml-3 user-active d-flex flex-column">

                                        <span>Nguyen Thanh An</span>
                                        <em>1 hours</em>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="user-department">
                                <span>SHSHHSH</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="content">
                        <div className="content-inner">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi facilis perspiciatis enim sit modi neque quibusdam? Ipsam doloribus esse incidunt ipsa praesentium qui natus! Iste deserunt quisquam doloremque quis sapiente?
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
                                        <img
                                            className='imgContent'
                                            src={image}
                                            alt="image content"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                    </div>
                </div>
                <div className="card-footer">
                    <div className="actions d-flex ">
                        <button className="btn btn-info">Like </button>
                        <button className="btn btn-info">Like </button>
                        <button className="btn btn-info">Like </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostUser;