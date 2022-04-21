import React, { useState, useEffect } from 'react'
import { Input, Form, Button, Upload, Select, Avatar, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import postApi from '../../api/post';

const { TextArea } = Input;
const { Option } = Select;

const Post = (props) => {
    const urlUploadFile = `${process.env.REACT_APP_API_URL}/user/post/file`;
    const [gameList, setGameList] = useState([]);
    const [form] = Form.useForm();
    const getAllGames = async () => {
        const allGames = await postApi.getAllGames();
        setGameList(allGames.games)
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
    const getToken = () => {
        const accessToken = localStorage.getItem("access_token");
        return accessToken;
    }
    const onFinish = async (values) => {
        const filePath = [];
        if (values.postFile) {
            for (let i = 0; i < values.postFile.fileList.length; i++) {
                filePath.push(values.postFile.fileList[i].response.filePath)
            }
        }
        const value = {
            content: values.content,
            postFile: filePath,
            game: values.game,
        }
        try {
            const response = await postApi.createPost(value);
            console.log(response);
        } catch (error) {
            console.log(error.response);
        }
        props.Cancel();
        props.onSubmit();
    };
    const uploadFile = async (info) => {
        console.log("uploadFile", info);
    }
    const beforeUpload = () => {

    }
    const accessToken = getToken();
    const authorization = {
        Authorization: `Bearer ${accessToken}`,
    }
    const fileList = [];
    useEffect(() => {
        getAllGames();
    }, [])
    return (
        <>
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
                    <TextArea
                        placeholder="Write something here"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </Form.Item>
                <Form.Item name="game">
                    <Select defaultValue="Playing...">
                        {gameList &&
                            gameList.map((game, index) => (
                                <Option key={index} value={game._id}>
                                    <Avatar size="small" shape="square" src={game.gameAvatar} /> {game.gameName}
                                </Option>
                            ))}
                    </Select>
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
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>



                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Post
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Post