import React, { useState } from 'react'
import { Input, Form, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const Post = () => {
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
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const fileList = [];

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
                        placeholder="Controlled autosize"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </Form.Item>

                <Form.Item>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture"
                        // className="upload-list-inline"
                        defaultFileList={[...fileList]}
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