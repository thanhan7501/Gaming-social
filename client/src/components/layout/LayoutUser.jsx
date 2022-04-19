import React from 'react'
import { Layout, Row, Col } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';

import HeaderComponent from '../../components/header/Header'

import './layoutUser.scss';

const { Header, Content } = Layout;

const LayoutUser = () => {

    const redirect = () => {
        return (
            <>
                <Layout className="layout">
                    <Header style={{ position: 'fixed', zIndex: 1001, width: '100%' }}>
                        <HeaderComponent />
                    </Header>
                    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                            <Row>
                                <Col xs={0} sm={1} md={2} lg={4} xl={6}>
                                </Col>
                                <Col xs={24} sm={22} md={20} lg={16} xl={12}>
                                    <Outlet />
                                </Col>
                                <Col xs={0} sm={1} md={2} lg={4} xl={6}>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                </Layout>
            </>
        )
    };

    return <>{redirect()}</>;
};

export default LayoutUser;