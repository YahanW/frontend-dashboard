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
      label: 'Video',
      value: 'video',
    },
  ];
  
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
