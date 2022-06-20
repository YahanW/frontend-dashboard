import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store=createStore(()=>{},composeWithDevTools(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <div>it works!</div>
  </Provider>
 
);
