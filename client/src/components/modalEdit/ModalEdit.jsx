import React from 'react'
import { Form, Button, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import postApi from '../../api/post'

const { TextArea } = Input;

const ModalEdit = (props) => {
    console.log(props)
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
    const onFinish = async (values) => {
        try {
            const response = await postApi.updatePost(props.id, values);

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
        props.Cancel();
        props.onSubmit();
    };
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
                        value={props.value}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Edit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default ModalEdit