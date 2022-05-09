import React, { useState, useEffect } from 'react';
import { Image, Modal, Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

import PostFrame from '../../../components/postFrame/PostFrame'

import profileApi from "../../../api/profile"
import "./profile.scss"


const Profile = () => {
  const [userPost, setUserPost] = useState();
  const [userProfile, setUserProfile] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { userInfor } = useSelector((state) => state.isAuthenticated);
  const urlUploadFile = `${process.env.REACT_APP_API_URL}/user/post/file`
  let { user } = useParams();
  const getProfile = async () => {
    try {
      const response = await profileApi.getProfile(user);
      console.log(response);
      setUserPost(response.post)
      setUserProfile(response.userProfile)
    } catch (error) {
      console.log(error.response);
    }
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
      avatarUrl: filePath,
    }
    try {
      const response = await profileApi.changeAvatar(value);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
    handleCancel();
    getProfile();
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
    getProfile();
  }, [user])

  return (
    <>
      <main>
        <div id="profile-upper">
          {userProfile &&
            <div id="profile-d">
              <div id="profile-pic">
                <Image src={userProfile.avatarUrl} />
              </div>
              <div id="u-name">{userProfile.fullName}</div>
              {(userInfor._id === userProfile._id && (
                <div id="edit-profile">
                  <button className="btn btn-info" onClick={showModal}>Edit</button>
                </div>
              ))}
            </div>
          }
          <div id="black-grd"></div>
        </div>
        <div id="main-content">
          <div className="tb">
            <div className="td" id="l-col">
              <div className="l-cnt">
                <div className="cnt-label">
                  <i className="l-i" id="l-i-i"></i>
                  <span>Intro</span>
                </div>
                <div id="i-box">
                  <div id="intro-line">Introduce yourself</div>
                </div>
              </div>
            </div>
          </div>
          {userPost && userPost.map((post, index) => (
            <PostFrame key={index} post={post.post} />
          ))}
        </div>
        <div id="device-bar-2"><i class="fab fa-apple"></i></div>
      </main>
      <Modal title="Change your avatar" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
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
              Change avatar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Profile;