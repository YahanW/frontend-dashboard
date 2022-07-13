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
              src='https://alacritas.cis.utas.edu.au/~mingked/kit301/JPGs/wedding2.jpg'
              text="The most romantic wedding With WonderfulWedding. Free quote, ask our friendly stuff now."
              label='Wedding'
              path='/service' />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://alacritas.cis.utas.edu.au/~mingked/kit301/JPGs/kids_bd2.jpg'
              text="Plan your kids next birthday party with PartyRus! PartyRus have everything you need. call now."
              label='Birthday'
              path='/service' />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://alacritas.cis.utas.edu.au/~mingked/kit301/JPGs/business_meeting.jpg'
              text="IBM held their conference meeting at this venue, click here to explore more."
              label='Conference'
              path='/service' />
          </ul>
          
        </div>
      </div>
    </div>
  )
}

export default Cards