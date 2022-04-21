import React, { useState, useEffect } from 'react'
import { Card, Image, Row, Col } from 'antd';
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
            <div className="d-flex flex-wrap justify-content-center align-items-center">
                {gameList && gameList.map((game, index) => (
                    <Row justify="center">
                        <Col span={48}>
                            <Card size="small" key={index} title={game.gameName} extra={<Link to={`/roomchat/${game._id}`}>Join Chat</Link>}>
                                <Image width={`15rem`} src={game.gameAvatar} />
                            </Card>
                        </Col>
                    </Row>
                ))}
            </div>

        </>
    )
}

export default Room