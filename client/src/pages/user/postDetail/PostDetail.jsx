import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Button, Modal, Avatar, Form, Input, Comment, List } from 'antd';
import { useParams } from 'react-router-dom';
import HeaderComponent from '../../../components/header/Header';
import PostComment from '../../../components/postComment/PostComment';
import postApi from '../../../api/post';

const { TextArea } = Input;
const { Header, Content } = Layout;

const PostDetail = () => {
    let { id } = useParams();
    const [post, setPost] = useState();
    const getPostDetail = async () => {
        try {
            const response = await postApi.getPostDetail(id);
            setPost(response);
        } catch (error) {

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
            {post && (
                <>
                    <PostComment post={post} />
                </>
            )}
            <Form.Item>
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
            </Form.Item>
        </>
    )
}

export default PostDetail;