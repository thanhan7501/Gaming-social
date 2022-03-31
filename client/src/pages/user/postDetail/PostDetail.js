import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Button, Modal, Avatar, Form, Input, Comment, List } from 'antd';
import { EditOutlined, EllipsisOutlined, LikeOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import { useParams } from 'react-router-dom';
import HeaderComponent from '../../../components/header/Header';
import postApi from '../../../api/post';

const { TextArea } = Input;
const { Meta } = Card;
const { Header, Content } = Layout;

const PostDetail = () => {
    let { id } = useParams();
    const [post, setPost] = useState([]);
    const getPostDetail = async () => {
        try {
            const response = await postApi.getPostDetail(id);
            console.log(response)
            setPost(response.post)
        } catch (error) {
            console.log(error)
        }
    }
    const data = [
        {
            actions: [<span key="comment-list-reply-to-0">Reply to</span>],
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
            ),
        },
    ];

    useEffect(() => {
        getPostDetail();
    }, [])


    return (
        <>
            <Layout className="layout">
                <Header style={{ position: 'fixed', zIndex: 10000, width: '100%' }}>
                    <HeaderComponent />
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        <Row>
                            <Col xs={0} sm={1} md={2} lg={4} xl={6}>
                            </Col>
                            <Col xs={24} sm={22} md={20} lg={16} xl={12}>
                                {post && (
                                    <>
                                        <Card
                                            style={{ width: '100%', marginTop: 20 }}
                                            cover={
                                                <Swiper
                                                    navigation={true}
                                                    pagination={true}
                                                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                                                    className="mySwiper"
                                                >
                                                    {post.postFile && post.postFile.map((image, index) => (
                                                        <SwiperSlide key={index} style={{ zIndex: 0 }}>
                                                            <img
                                                                className='imgContent'
                                                                src={image}
                                                                alt="image content"
                                                            />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            }
                                            actions={[
                                                <LikeOutlined key="like" />,
                                                <EditOutlined key="edit" />,
                                                <EllipsisOutlined key="ellipsis" />,
                                            ]}
                                        >
                                            <Meta
                                                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                title={post.user.fullName}
                                                description={post.content}
                                            />
                                        </Card>
                                    </>
                                )}
                                {/* <Form.Item>
                <TextArea placeholder="Write something here"
                    autoSize={{ minRows: 1, maxRows: 3 }} />
                <List
                    className="comment-list"
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <li>
                            <Card>
                                <Comment
                                    author={item.author}
                                    avatar={item.avatar}
                                    content={item.content}
                                />
                            </Card>
                        </li>
                    )}
                />
            </Form.Item> */}
                            </Col>
                            <Col xs={0} sm={1} md={2} lg={4} xl={6}>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </>
    )
}

export default PostDetail;