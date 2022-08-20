import React, { Component } from 'react';
import Customer from './Customer';
import Merchant from './Merchant';
import ABN from './ABN';
export default class Register extends Component {
  render() {
    return (
      <div>
        
        {
          this.props.mode == 'm'?
          <Merchant/>
          :
          <Customer/>
          
        }
      </div>
    )
  }
}
