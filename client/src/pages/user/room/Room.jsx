import React, { useState, useEffect } from 'react'
import { Card, Image } from 'antd';
import { Link } from 'react-router-dom';

import gameApi from '../../../api/game'
const Room = () => {
    const [gameList, setGameList] = useState([]);
    const getAllGames = async () => {
        const allGames = await gameApi.getAllGames();
        setGameList(allGames.games)
    }

    useEffect(() => {
        getAllGames();
    }, [])

    return (
        <>
            {gameList && gameList.map((game, index) => (
                <Card size="small" key={index} title={game.gameName} extra={<Link to={`/roomchat/${game._id}`}>Join Chat</Link>} style={{ width: 300 }}>
                    <Image width={200} src={game.gameAvatar} />
                </Card>
            ))}
        </>
    )
}

export default Room