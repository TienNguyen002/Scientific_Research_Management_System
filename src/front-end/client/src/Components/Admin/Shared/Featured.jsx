import React, {useState, useEffect} from 'react'
import "./style/admin-component.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import { getInfoDashboard } from "../../../Services/AdminService"

const Featured = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getInfoDashboard().then((data) => {
      if(data){
        setFeatured(data);
      } else setFeatured([]);
    })
  }, []);

  return (
    <div className='featured'>
        <div className="featured-top">
            <div className="featured-title">Tổng đề tài được nghiệm thu</div>
            <MoreVertIcon/>
        </div>
        <div className="featured-bottom">
            <div className="featured-chart">
                <CircularProgressbar value={(featured.countTopicDone/featured.countTopic)*100} strokeWidth={5}/>
            </div>
            <p>Tổng đề tài đã được nghiệm thu</p>
            <p className='text-center'>{featured.countTopicDone} đề tài / {featured.countTopic} đề tài</p>
        </div>
    </div>
  )
}

export default Featured;
