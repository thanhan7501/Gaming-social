import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Comment, List } from 'antd';
import { useParams } from 'react-router-dom';
import PostComment from '../../../components/postComment/PostComment';
import postApi from '../../../api/post';
import socket from '../../../socket/socket'

const { TextArea } = Input;
let allComment = [];

const PostDetail = () => {
    let { id } = useParams();
    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [val, setVal] = useState("");
    const getPostDetail = async () => {
        try {
            const response = await postApi.getPostDetail(id);
            setPost(response);
            allComment = response.comment;
            setComments(allComment);
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = async (event) => {
        setVal(event.target.value);
    }

    const comment = async (event) => {
        event.preventDefault();
        let commentContent = val;
        const payload = {
            commentContent: commentContent,
            postId: id,
        }
        socket.emit("comment:create", payload)

        socket.on("comment:send", (newComment) => {
            allComment.unshift(newComment);
            setComments(allComment);
            // console.log("send",comments)
        })
        setVal("");
    }

    useEffect(() => {
        getPostDetail();
    }, [])

    useEffect(() => {
        socket.on("comment:broadcast", (newComment) => {
            allComment.unshift(newComment);
            setComments(allComment);
            // console.log("broadcast",comments)
        })
    }, [socket])

    return (
        <>
            {post && (
                <>
                    <PostComment post={post} />
                </>
            )}
            <Form.Item>
                <TextArea placeholder="Write something here"
                    onKeyPress={(event) => {
                        if (event.key === "Enter") {
                            comment(event);
                        }
                    }}
                    value={val}
                    autoSize={{ minRows: 1, maxRows: 3 }} 
                    onChange={handleChange}
                    />
                <List
                    className="comment-list"
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={item => (
                        <li>
                            <Card>
                                <Comment
                                    author={item.user.fullName}
                                    avatar={item.user.avatarUrl}
                                    content={item.commentContent}
                                    datetime={new Date(item.createdAt).toLocaleString()}
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