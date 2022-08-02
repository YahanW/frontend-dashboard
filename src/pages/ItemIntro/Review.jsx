import React from 'react';
import './Review.css';
import { Tag, Rate,Checkbox } from 'antd';

export default function Review() {
  const options = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Image',
      value: 'image',
    },
    {
      label: 'Video',value: 'video',},];
  const reviewList = [
    {
      content:'I was in Hobart Last year for few hours of business and meetings in Salamanca, decided to go inside LUC while I was ...',
      date:'04-03-2022',
      username:'a***z(anonymous)'
    },
    {
      content:'I was in Hobart Last year for few hours of business and meetings in Salamanca, decided to go inside LUC while I was ...',
      date:'04-03-2022',
      username:'a***z(anonymous)'
    },
  ]
  return (
    <div className='review'>
      <div className='cate-review'>
        <div className='total'>
          <Rate disabled defaultValue={4.5}/>
          <h2>4.5</h2>
        </div>
        <div className='marks'>
          <div className='good'>
            <Tag className="review-tag">Good Service 10</Tag>
            <Tag className="review-tag">Enjoyable Service</Tag>
          </div>
          <div className='bad'>
            <Tag className="review-tag">Not Feeling Good</Tag>
          </div>
        </div>
       
      </div>
      <div className="type-three">
        <Checkbox.Group options={options} />
      </div>
      <div className='review-container'>
        <ul>
          {
            reviewList.map((ele,index)=>{
              return <li key={index}>
                <div className='rates'>
                  <div className='left'>
                    <p className='content'>{ele.content}</p>
                    <h4 className='date'>{ele.date}</h4>
                  </div>
                  <div className='right'>
                    <h5>{ele.date}</h5>
                  </div>
                  
                </div>
            </li>
          })
        }
        </ul>

      </div>
    </div>
  )
}
