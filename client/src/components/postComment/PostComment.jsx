import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Avatar, Image, Menu, Dropdown, Radio, Space, Modal, Form, Button, Input } from 'antd';
import { EditOutlined, LikeOutlined, EllipsisOutlined, DeleteOutlined, LikeTwoTone, FlagOutlined, RetweetOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

import ModalDelete from '../modalDelete/ModalDelete';

import likeApi from '../../api/like';
import postApi from '../../api/post'
import reportApi from '../../api/report';
import shareApi from '../../api/share'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'react-toastify/dist/ReactToastify.css';
import "./postComment.scss";

const { TextArea } = Input;

const PostComment = (props) => {
    const [liked, setLiked] = useState(props.post.liked);
    const [likes, setLikes] = useState(props.post.likes);
    const [edit, setEdit] = useState(props.post.post.content);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isReportVisible, setIsReportVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [value, setValue] = useState()
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 24,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 24,
            },
        },
    };
    const onChange = (e) => {
        setValue(e.target.value)
    }
    const navigate = useNavigate();

    const { userInfor } = useSelector((state) => state.isAuthenticated);
    let { id } = useParams();

    const showModalDelete = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        handleDelete();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showReport = () => {
        setIsReportVisible(true);
    };

    const handleOkReport = () => {
        handleReport();
        setIsReportVisible(false);
    };

    const handleCancelReport = () => {
        setIsReportVisible(false);
    };

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

    const handleReport = async () => {
        const values = {
            postId: id,
            reason: value
        }
        try {
            const response = await reportApi.reportPost(values);
            if (response.status === true) {
                toast.success("Report success!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            else {
                toast.error("Error, Report Failed !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await postApi.deletePost(id);
            if (response.status === true) {
                toast.success("Delete success!", {
                    position: toast.POSITION.TOP_RIGHT
                });
                props.offSocket();
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

    const handleShare = async () => {
        try {
            const response = await shareApi.createShare({ post: id });
            if (response.status === true) {
                toast.success("Share success!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            else {
                toast.error("Error, Share Failed !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            toast.error("Error, Share Failed !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    const handleOkEdit = () => {
        setIsEditVisible(false);
    }

    const showModalEdit = () => {
        setIsEditVisible(true);
    }

    const handleCancelEdit = () => {
        setIsEditVisible(false);
    }

    const onFinish = async (values) => {
        try {
            const response = await postApi.updatePost(id, values);

            if (response.status === true) {
                toast.success("Edit success!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            else {
                toast.error("Error, Edit Failed !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Error, Edit Failed !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        handleCancelEdit();
        props.callApiAgain();
    };

    const onChangeEdit = (e) => {
        setEdit(e.target.value)
    }

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<FlagOutlined />} onClick={showReport}>
                Report
            </Menu.Item>
            <Menu.Item key="2" icon={<RetweetOutlined />} onClick={handleShare}>
                Share
            </Menu.Item>
            {(userInfor._id === props.post.post.user._id || userInfor.isAdmin === true) && (
                <Menu.Item key="3" icon={<DeleteOutlined />} onClick={showModalDelete}>
                    Delete
                </Menu.Item>
            )}
            {(userInfor._id === props.post.post.user._id || userInfor.isAdmin === true) && (
                <Menu.Item key="4" icon={<SettingOutlined />} onClick={showModalEdit}>
                    Edit
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
                    <li style={{ width: '33.3333%' }}>
                        <span>
                            {`${props.post.post.viewCount} views`}
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
            <ModalDelete isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} action="Delete this post" />
            <Modal title="Edit this post" visible={isEditVisible} onOk={handleOkEdit} onCancel={handleCancelEdit} footer={[]}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="post"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the content',
                            },
                        ]}
                    >
                        {edit && (
                            <TextArea
                                placeholder="Write something here"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                value={edit}
                                onChange={onChangeEdit}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Edit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Report Reason" visible={isReportVisible} onOk={handleOkReport} onCancel={handleCancelReport}>
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        <Radio value='Hate Speech' selected>Hate Speech</Radio>
                        <Radio value='Violate Law'>Violate Law</Radio>
                        <Radio value='Scam'>Scam</Radio>
                    </Space>
                </Radio.Group>
            </Modal>
        </div>
    )
}

export default PostComment;