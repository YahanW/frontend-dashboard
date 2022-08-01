import React from 'react';
import './Review.css';
import { Tag } from 'antd';

export default function Review() {
  return (
    <div className='review'>
      <div className='cate-review'>
        <Tag color="red">Good Service 10</Tag>
        <Tag color="red">Waste Time</Tag>
        <Tag color="volcano">Service Match Budget</Tag>
        <Tag color="green">Not Feeling Good</Tag>
      </div>
      <div className="type-three"></div>
      <div className='review-container'>
        <ul>
            <li>
                <div>
                   
                </div>
            </li>
            <li>
                <div>
                   
                </div>
            </li>
            <li>
                <div>
                   
                </div>
            </li>
        </ul>

      </div>
    </div>
  )
}
