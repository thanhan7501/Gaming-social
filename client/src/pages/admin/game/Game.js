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
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 150,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
  )
}

export default Game