import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Button, Modal, Avatar, Form, Input, Comment, List } from 'antd';
import HeaderComponent from '../../../components/header/Header';
import Post from '../../../components/post/Post';
import PostFrame from '../../../components/postFrame/PostFrame';
import postApi from '../../../api/post';
import "./Home.scss"

const { Header, Content } = Layout;

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postList, setPostList] = useState([]);
  const getAllPost = async () => {
    try {
      const response = await postApi.getAllPost();
      setPostList(response.post)
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
      <Card title="Post something ..." bordered={false}>
        <Button type="ghost" shape="round" size='large' onClick={showModal} >
          What's on your mind ?
        </Button>
      </Card>

      {postList && postList.map((post, index) => (
        <PostFrame post={post} />
      ))}

      <Modal title="Create Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        footer={[]}
      >
        <Post Cancel={handleCancel} onSubmit={getAllPost} />
      </Modal>
    </>
  )
}

export default Home;