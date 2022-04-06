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
    
    <Table columns={columns} dataSource={gameList} pagination={{ pageSize: 50 }} />
  )
}

export default Game