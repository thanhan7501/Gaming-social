import React, { useState, useEffect } from 'react'
import { Table, Image, Space, Button } from 'antd';
import { Link } from 'react-router-dom'
import reportApi from '../../../api/report'

const Report = () => {
  const [reportList, setReportList] = useState([]);
  const getAllreports = async () => {
    const allReports = await reportApi.getAllReports();
    setReportList(allReports.data.reports)
    console.log(allReports)
  }

  useEffect(() => {
    getAllreports();
  }, [])

  const columns = [
    {
      title: 'Reported user',
      dataIndex: 'reportedUser',
      key: 'reportedUser',
      render: text => <Link to={`/profile/${text._id}`}>{text.fullName}</Link>
    },
    {
      title: 'Reported post',
      dataIndex: 'post',
      key: 'post',
      render: text => <Link to={`/post/${text._id}`}>Link to Post</Link>
    },
    {
      title: 'Report reason',
      dataIndex: 'reason',
      key: 'reason',
      render: text => <p>This post was believed to violate the community standards and was reported for the following reason: {text}</p>
    },
    {
      title: 'Reported time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => <p>{new Date(text).toLocaleString()}</p>
    },
  ];


  return (
    <>
      <Table columns={columns} dataSource={reportList} pagination={{ pageSize: 10 }} />
    </>
  )
}

export default Report