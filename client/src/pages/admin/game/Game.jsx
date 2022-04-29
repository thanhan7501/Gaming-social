import React, { useEffect, useState } from 'react'
import { Table, Image, Space, Button, Modal, Input, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import gameApi from '../../../api/game'

import './game.scss'

const Game = () => {
  const urlUploadFile = `${process.env.REACT_APP_API_URL}/user/post/file`
  const [gameList, setGameList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const getAllGames = async () => {
    const allGames = await gameApi.getAllGames();
    setGameList(allGames.games)
  }

  const getToken = () => {
    const accessToken = localStorage.getItem("access_token");
    return accessToken;
  }

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

  const uploadFile = async (info) => {
    console.log("uploadFile", info);
  }

  const onFinish = async (values) => {
    let filePath = "";
    if (values.postFile) {
      for (let i = 0; i < values.postFile.fileList.length; i++) {
        filePath = values.postFile.fileList[i].response.filePath
      }
    }
    const value = {
      gameName: values.gameName,
      gameAvatar: filePath,
    }
    try {
      const response = await gameApi.createGame(value);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
    handleCancel();
    getAllGames();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const accessToken = getToken();
  const authorization = {
    Authorization: `Bearer ${accessToken}`,
  }
  const fileList = [];

  useEffect(() => {
    getAllGames();
  }, [])

  const columns = [
    {
      title: 'Game',
      dataIndex: 'gameName',
      key: 'gameName',
    },
    {
      title: 'Icon',
      dataIndex: 'gameAvatar',
      key: 'gameAvatar',
      render: text => <Image width={200} src={text} />
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" block onClick={showModal}>
        Add new Game
      </Button>
      <Table columns={columns} dataSource={gameList} pagination={{ pageSize: 3 }} />
      <Modal title="Add new Game" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
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
            name="gameName"
            rules={[
              {
                required: true,
                message: 'Please input game name!',
              },
            ]}
          >
            <Input placeholder="Game Name" />
          </Form.Item>
          <Form.Item
            name="postFile">
            <Upload
              action={urlUploadFile}
              listType="picture"
              className="upload-list-inline"
              defaultFileList={[...fileList]}
              onChange={uploadFile}
              // beforeUpload={beforeUpload}
              headers={authorization}
              name="postFile"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Add new Game
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Game