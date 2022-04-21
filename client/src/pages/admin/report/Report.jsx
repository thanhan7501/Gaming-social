import React, { useState, useEffect } from 'react'

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

  return (
    <>
      
    </>
  )
}

export default Report