import React from 'react'
import "./style/admin-component.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"

const Featured = () => {
  return (
    <div className='featured'>
        <div className="featured-top">
            <div className="featured-title">Tổng đề tài được nghiệm thu</div>
            <MoreVertIcon/>
        </div>
        <div className="featured-bottom">
            <div className="featured-chart">
                <CircularProgressbar value={0} text='0%' strokeWidth={5}/>
            </div>
        </div>
    </div>
  )
}

export default Featured;
