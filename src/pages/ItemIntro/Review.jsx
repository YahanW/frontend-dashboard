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
      content:'Absolutely fantastic',
      date:'04-03-2022',
      username:'S***n (anonymous)'
    },
    {
      content:'Yes so much we say out of all the art galleries I’ve ever visited this one stands out is quite unique, varied, diverse, and really quite engaging. I would highly recommend you come visit this place, if not for the art just the hospitality itself is worth the visit alone. Do you check this out if you ever in the area, you will not be disappointed.',
      date:'04-03-2022',
      username:'G***l (anonymous)'
    },
    {
      content:'Lots of interesting pieces to look at and even some to buy! Nice spaces that have been tastefully fitted out to show off some wonderful art - the shop also has some amazing Tasmania items to buy!',
      date:'04-03-2022',
      username:'G***l (anonymous)'
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
                    <h3>{ele.username}</h3>
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
