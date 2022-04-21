import React from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, NotificationOutlined } from '@ant-design/icons';
import { Outlet, Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const LayoutAdmin = () => {
    const routes = [
        {
            path: '/admin',
            breadcrumbName: 'Dashboard',
            icon: <UserOutlined />,
        },
        {
            path: '/admin/game',
            breadcrumbName: 'Game',
            icon: <UploadOutlined />,
        },
        {
            path: '/admin/report',
            breadcrumbName: 'Report',
            icon: <NotificationOutlined />,
        },
    ];

    const redirect = () => {
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo-icon" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        {routes.map((route, index) => {
                            const key = index + 1;
                            return (<Menu.Item key={key} icon={route.icon}>
                                <Link to={`${route.path}`} >
                                    {route.breadcrumbName}
                                </Link>
                            </Menu.Item>);
                        })}
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', height: '100%' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Outlet />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Nguyen Thanh An</Footer>
                </Layout>
            </Layout>
        )
    }

    return <>{redirect()}</>;
}

export default LayoutAdmin