import React, { useEffect, useState } from 'react'
import { Table, Image, Space, Layout, Menu, Button } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, DeleteOutlined } from '@ant-design/icons';
import gameApi from '../../../api/game'

import './game.scss'

const { Header, Content, Footer, Sider } = Layout;

const Game = () => {
  const [gameList, setGameList] = useState([]);
  const getAllGames = async () => {
    const allGames = await gameApi.getAllGames();
    setGameList(allGames.games)
    console.log(allGames)
  }

  useEffect(() => {
    getAllGames();
  }, [])

  const columns = [
    {
      title: 'Game',
      dataIndex: 'gameName',
      key: 'gameName',
    },
    {
      title: 'Icon',
      dataIndex: 'gameAvatar',
      key: 'gameAvatar',
      render: text => <Image width={200} src={text} />
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            nav 4
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Table columns={columns} dataSource={gameList} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default Game