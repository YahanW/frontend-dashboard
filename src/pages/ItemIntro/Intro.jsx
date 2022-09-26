/*
This file displays the service details. 
Hardcoded for now. 

Created by Mingke Deng, and Hans Wang
Last Modified: 25/09/2022
*/
import React,{useState,useEffect} from 'react';
import './Intro.css';
import { Divider } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { render } from 'react-dom';

export default function Intro() {
  const [details,setDetails] = useState([]);
  const {servicesId} = useParams();
  const getDetail = async ()=>{
    const {data} = await axios.get(`https://eventeasyau.azurewebsites.net/api/services/getservices/${servicesId}`)
    setDetails(data);
  }




  useEffect(()=>{
    getDetail();
  },[])
  return (
    <div className='intro-box'>
     <div className='img-slice'>

      <h2>
          {details.eventType==0?'Wedding&Engagement':(details.eventType==1?'Birthday&Private':'Corporate Functions')} Packages</h2>
      <div className='imgs' style={{backgroundImage:`url(https://www.weddinggownpreservationkit.com/images/zoom-wedding/thumbs/zoom-enchanted-forest-wedding-background-tmb.jpg)`}}>
        <div className='img-sub'>

        </div>
      </div>
     </div>
     <Divider/>
     <div className='intro-a'>
        <h3>Different Themes</h3>
        <p>
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur
        </p>
     </div>
     <div className='intro-slice'>
        <p>
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
        </p>
     </div>
     <div className='intro-c'>
        <h3>Theme Name</h3>
        <p>
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur
        </p>
     </div>
     <Divider/>
     <div className='facility'>
      <div className='left'>
        <h2>Facility Description</h2>
        <Divider/>
        <div className='fls'>
          <div className='fl-a'>
            <h4>Sed ut perspiciatis unde omnis iste</h4>
            <h4>Sed ut perspiciatis unde omnis iste</h4>
            <h4>Sed ut perspiciatis unde omnis iste</h4>
            <h4>Sed ut perspiciatis unde omnis iste</h4>
          </div>
          <div className='fl-b'>
            <h4>accusantium doloremque laudantium</h4>
            <h4>accusantium doloremque laudantium</h4>
            <h4>accusantium doloremque laudantium</h4>
            <h4>accusantium doloremque laudantium</h4>
          </div>
        </div>
      </div>
      <div className='right'>
      <Divider className='upper'/>
        <div className='labels' style={{display:'flex',}}>
          <h3 style={{marginLeft:'5%',width:'50%'}}>Style</h3>
          <h3 style={{marginLeft:'5%',width:'50%'}}>Capacity</h3>
        </div>
      <Divider/>
        <div className='labels' style={{display:'flex',}}>
            <h3 style={{width:'50%',paddingLeft:'5%'}}>natus error </h3>
            <h3 style={{width:'50%',paddingLeft:'5%'}}>voluptatem</h3>
          </div>
      </div>
     </div>
     <div className='recommend'>

     </div>
    </div>
  )
}
