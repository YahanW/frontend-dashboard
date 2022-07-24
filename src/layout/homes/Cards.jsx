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
              src='https://as2.ftcdn.net/v2/jpg/02/73/71/81/1000_F_273718165_9UmXQCHsYJyfgtz62sq0mmTxofcw9lI8.jpg'
              text="Plan your kids next birthday party with PartyRus! PartyRus have everything you need. call now."
              label='Birthday'
              path='/service' />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://img.freepik.com/free-photo/happy-company-friends-summer-tropical-vacation-thailand-traveling-boat-sea-party-beach-people-having-fun-together-men-women-positive-emotions_285396-6118.jpg?t=st=1658650658~exp=1658651258~hmac=1960aca865e5a3de4f1a0777dcad5007fc93c30be58a573d973da51ffc0b6650&w=900'
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