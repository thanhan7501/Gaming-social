import React, { useState } from 'react';
import { Layout, Row, Col, Card, Button, Modal } from 'antd';
import HeaderComponent from '../../../components/header/Header';
import Post from '../../../components/post/Post';
import "./Home.scss"

const { Header, Content } = Layout;

const Home = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

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
            <Layout className="layout">
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <HeaderComponent />
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        <Row>
                            <Col xs={0} sm={1} md={2} lg={4} xl={6}>
                            </Col>
                            <Col xs={24} sm={22} md={20} lg={16} xl={12}>
                                <Card title="Post something ..." bordered={false}>
                                    <Button type="ghost" shape="round" size='large' onClick={showModal} >
                                        What's on your mind ?
                                    </Button>
                                </Card>
                            </Col>
                            <Col xs={0} sm={1} md={2} lg={4} xl={6}>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>

            <Modal title="Create Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={[]}
            >
                <Post />
            </Modal>
        </>
    )
}

export default Home;