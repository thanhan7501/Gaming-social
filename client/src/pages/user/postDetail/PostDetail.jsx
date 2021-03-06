import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Comment, List } from 'antd';
import { useParams, useLocation } from 'react-router-dom';
import PostComment from '../../../components/postComment/PostComment';
import postApi from '../../../api/post';
import socket from '../../../socket/socket'

const { TextArea } = Input;
let allComment = [];

const PostDetail = () => {
    let { id } = useParams();
    const location = useLocation();
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const [val, setVal] = useState("");
    const offSocket = () => {
        socket.disconnect();
        socket.off();
    }
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

    const userRead = async () => {
        const roomId = id;
        socket.on('connect', (socket) => {
            // console.log(socket); // x8WIv7-mJelg7on_ALbx
        });
        socket.emit("joinRoom", { roomId });
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
        setVal("");
    }

    useEffect(() => {
        getPostDetail();
        userRead();
        socket.on("comment:broadcast", (newComment) => {
            setComments((comments) => [newComment, ...comments]);
        })

        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [id])

    return (
        <>
            {post && (
                <div className="mt-2">
                    <PostComment offSocket={offSocket} post={post} callApiAgain={getPostDetail} />
                </div>
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