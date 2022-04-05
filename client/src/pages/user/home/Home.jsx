import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Button, Modal, Avatar, Form, Input, Comment, List } from 'antd';
import { EditOutlined, EllipsisOutlined, LikeOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Link } from "react-router-dom";
import HeaderComponent from '../../../components/header/Header';
import Post from '../../../components/post/Post';
import PostUser from '../../../components/postUser/PostUser';
import postApi from '../../../api/post';
import "./Home.scss"

const { Header, Content } = Layout;
const { Meta } = Card;

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postList, setPostList] = useState([]);
  const getAllPost = async () => {
    try {
      const response = await postApi.getAllPost();
      setPostList(response.allPost)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  console.log(postList)

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getAllPost();
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
                <Card title="Post something ..." bordered={false}>
                  <Button type="ghost" shape="round" size='large' onClick={showModal} >
                    What's on your mind ?
                  </Button>
                </Card>

                {postList && postList.map((post, index) => (
                  <PostUser post={post} />
                ))}
{/* 
                {postList && postList.map((post, index) => (
                  <>
                    <Card
                      key={index}
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
                        <Link to={`/post/${post._id}`}>
                          <EditOutlined key="comment" />
                        </Link>,
                        <EllipsisOutlined key="ellipsis" />,
                      ]}
                    >
                      <Meta
                        avatar={<Link to={`/user/${post.user._id}`} ><Avatar src="https://joeschmoe.io/api/v1/random" /></Link>}
                        title={<Link to={`/user/${post.user._id}`} >{post.user.fullName}</Link>}
                        description={post.content}
                      />
                    </Card>
                  </>
                ))} */}


              </Col>
              <Col xs={0} sm={1} md={2} lg={4} xl={6}>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>

      <Modal title="Create Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        footer={[]}
      >
        <Post Cancel={handleCancel} onSubmit={getAllPost} />
      </Modal>
    </>
  )
}

export default Home;