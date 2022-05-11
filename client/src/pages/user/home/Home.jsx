import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Divider, Select, Empty  } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../../../components/post/Post';
import PostFrame from '../../../components/postFrame/PostFrame';
import Loading from '../../../components/loading/Loading';
import postApi from '../../../api/post';
import "./Home.scss"

const { Option } = Select;

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postList, setPostList] = useState([]);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('newest');
  const [hasMore, setHasMore] = useState(true);
  const getPost = async (sort, page) => {
    console.log(sort, page)
    try {
      const response = await postApi.getAllPost(sort, page);
      console.log(response);
      setPostList(response.post)
      setData(response);
      setPage((page) => page + 1)
    } catch (error) {
      console.log(error)
    }
  }

  const getMorePost = async () => {
    if (postList.length >= data.totalRecord) {
      setHasMore(false);
      return;
    }
    setPage(page + 1)
    try {
      const response = await postApi.getAllPost(sort, page);
      console.log(response);
      setPostList(postList.concat(response.post));
      setData(response);
    } catch (error) {
      console.log(error)
    }
  }

  const callApiAgain = () => {
    getPost('newest', 1)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (value) => {
    setSort(value);
    setPage(1);
  }

  useEffect(() => {
    getPost(sort, page);
  }, [sort])

  return (
    <>
      <Card title="Post something ..." bordered={false}>
        <Button type="ghost" shape="round" size='large' onClick={showModal} >
          What's on your mind ?
        </Button>
      </Card>
      <Divider orientation="left">
        <Select defaultValue="Newest" style={{ width: 120 }} onChange={handleChange}>
          <Option value="newest">Newest</Option>
          <Option value="like">Most Like</Option>
          <Option value="view">Most View</Option>
        </Select>
      </Divider>
      {postList && (
        <InfiniteScroll
          dataLength={postList.length}
          next={getMorePost}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={
            <div style={{ marginTop: 20 }}>
              <Empty description={false} />
            </div>
          }
        >
          {postList && postList.map((post, index) => (
            <div key={index} className="mt-4 mb-4">
              <PostFrame post={post} />
            </div>
          ))}
        </InfiniteScroll>
      )}
      <Modal title="Create Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        footer={[]}
      >
        <Post Cancel={handleCancel} onSubmit={callApiAgain} />
      </Modal>
    </>
  )
}

export default Home;