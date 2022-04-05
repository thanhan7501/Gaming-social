import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import authApi from "../../api/authApi";
import Register from "../user/register/Register";

import "./Login.scss"

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            const response = await authApi.login(values)
            console.log(response)
            if (response.data && response.status === true) {
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("refresh_token", response.data.refresh_token);
                localStorage.setItem("expired_time", response.data.expired_time);
            }
            navigate("/");
        } catch (error) {
            console.log(error.response);
            setErr(true)
        }
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [err, setErr] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <div className="container-login">
                <div className="top"></div>
                <div className="bottom"></div>
                <div className="center">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>
                        {err === true &&
                            (<>
                                <div class="ant-form-item-explain-error">*Email or password is not correct</div>
                            </>)}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a onClick={showModal}>register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <Modal title="Register your account" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={[]} >
                <Register />
            </Modal>

        </>
    )
}

export default Login