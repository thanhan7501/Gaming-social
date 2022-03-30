import React from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useSelector } from "react-redux";

const HeaderComponent = () => {
    const { userInfor } = useSelector((state) => state.isAuthenticated);
    console.log(userInfor)
    const routes = [
        {
            path: '/',
            breadcrumbName: 'Home',
            icon: '',
        },
        {
            path: '/chat',
            breadcrumbName: 'Chat',
            icon: '',
        },
        {
            path: `/profile/${userInfor._id}`,
            breadcrumbName: 'Profile',
            icon: '',
        },
    ];
    
    return (
        <>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                {routes.map((route, index) => {
                    const key = index + 1;
                    return (<Menu.Item key={key}>
                        <Link to={`${route.path}`} >
                            {`${route.breadcrumbName}`}
                        </Link>
                    </Menu.Item>);
                })}
            </Menu>
        </>
    )
}

export default HeaderComponent;