import React from 'react'
import { Layout, Row, Col } from 'antd';

const { Header, Content } = Layout;

const Layout = () => {
    return (
        <>
            <Layout className="layout">
                <Header style={{ position: 'fixed', zIndex: 10000, width: '100%' }}>
                    <HeaderComponent />
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        <Row>
                            <Col xs={0} sm={1} md={2} lg={4} xl={6}>
                            </Col>
                            <Col xs={24} sm={22} md={20} lg={16} xl={12}>
                            </Col>
                            <Col xs={0} sm={1} md={2} lg={4} xl={6}>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </>
    )
}

export default Layout