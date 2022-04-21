import React, { useEffect, useState } from 'react'
import { Table, Image, Space, Button } from 'antd';
import gameApi from '../../../api/game'

import './game.scss'

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
    <>
      <Button type="primary" block>
        Primary
      </Button>
      <Table columns={columns} dataSource={gameList} pagination={{ pageSize: 50 }} />
    </>
  )
}

export default Game