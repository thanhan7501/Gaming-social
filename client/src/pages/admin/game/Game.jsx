import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import gameApi from '../../../api/game'

const Game = () => {
  const [gameList, setGameList] = useState([]);
  const getAllGames = async () => {
    const allGames = await gameApi.getAllGames();
    setGameList(allGames.games)
  }

  const columns = [
    {
      title: 'Game',
      dataIndex: 'gameName',
      width: 150,
    },
    {
      title: 'Icon',
      dataIndex: 'game',
      width: 150,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const data = [];
  data.push(gameList);

  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
  )
}

export default Game