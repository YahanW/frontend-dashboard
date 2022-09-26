/*
This file shows some of the successful events
as card section. 

Created by Mingke Deng, and Hans Wang
Last Modified: 23/09/2022
*/

import React from 'react'
import CardItem from './CardItem'
import "./Cards.css"

function Cards() {
  return (
    <div className='cards'>
      <h1>Amazing Events</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
  
          <ul className='cards__items'>
            <CardItem
              src='https://easyevent.blob.core.windows.net/image/wedding2_cc8215ae44609.jpg'
              text="The most romantic wedding With WonderfulWedding. Free quote, ask our friendly stuff now."
              label='Wedding'
              path='/service' />
              <div className='desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</div>
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://as2.ftcdn.net/v2/jpg/02/73/71/81/1000_F_273718165_9UmXQCHsYJyfgtz62sq0mmTxofcw9lI8.jpg'
              text="Plan your kids next birthday party with PartyRus! PartyRus have everything you need. call now."
              label='Birthday'
              path='/service' />
              <div className='desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</div>
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://img.freepik.com/free-photo/happy-company-friends-summer-tropical-vacation-thailand-traveling-boat-sea-party-beach-people-having-fun-together-men-women-positive-emotions_285396-6118.jpg?t=st=1658650658~exp=1658651258~hmac=1960aca865e5a3de4f1a0777dcad5007fc93c30be58a573d973da51ffc0b6650&w=900'
              text="IBM held their conference meeting at this venue, click here to explore more."
              label='Conference'
              path='/service' />
              <div className='desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</div>
          </ul>
          
        </div>
      </div>
    </div>
  )
}

export default Cards