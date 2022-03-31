import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from 'antd';
import { Menu, Button } from 'antd';
import { HomeOutlined, WechatOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";


const HeaderComponent = () => {
    const { userInfor } = useSelector((state) => state.isAuthenticated);
    const routes = [
        {
            path: '/',
            breadcrumbName: 'Home',
            icon: <HomeOutlined />,
        },
        {
            path: '/chat',
            breadcrumbName: 'Chat',
            icon: <WechatOutlined />,
        },
        {
            path: `/profile/${userInfor._id}`,
            breadcrumbName: 'Profile',
            icon: <UserOutlined />,
        },
    ];

    return (
        <>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                {routes.map((route, index) => {
                    const key = index + 1;
                    return (<Menu.Item key={key}>
                        <Link to={`${route.path}`} >
                            <Button type="link" icon={route.icon}>{`${route.breadcrumbName}`}</Button>
                        </Link>
                    </Menu.Item>);
                })}
            </Menu>
        </>
    )
}

export default HeaderComponent;