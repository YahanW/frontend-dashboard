/*
This file shows the reviews recieved for a service

Created by Mingke Deng, and Hans Wang
Last Modified: 25/09/2022
*/

import React, { useState, useEffect } from 'react';
import './Review.css';
import { Tag, Rate, Checkbox } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import { usePromiseTracker } from 'react-promise-tracker';
import { Puff } from 'react-loader-spinner';
import { trackPromise } from 'react-promise-tracker';
import axios from 'axios';

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

  const [reviewList, setReviewList] = useState([]);
  const { servicesId } = useParams();


  const getReviews = async () => {
    const data = await axios.get(`https://eventeasyau.azurewebsites.net/api/reviews/getreviewbyservice/${servicesId}`)
          .catch(err => {
        console.log(err)
      })
    console.log(data.data.$values)
    setReviewList(data.data.$values);

  }

  useEffect(() => {
    getReviews();
    // console.log(reviewList);
  }, []
  )


  return (
    <div className='review'>
      <div className='cate-review'>
        <div className='total'>
          <Rate defaultValue={4.5} />
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
            reviewList.map((ele, index) => {
              return (
                <li key={index}>
                  <div className='rates'>
                    <div className='left'>
                      <p className='content'>{ele.description}</p>
                      <h4 className='date'>{ele.date}</h4>
                    </div>
                    <div className='right'>
                      <Rate defaultValue={ele.rate} style={{display:"flex", flexDirection:"row",border:'0',width:'50%'}}
                      disabled={true}/>
                      <h3>Username: {ele.user.userName}</h3>
                    </div>

                  </div>
                  
                </li>
              )
            })
          }
        </ul>

      </div>
    </div>
  )
}
